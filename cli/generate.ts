#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs";
import ora from "ora";
import path from "path";

// 🧠 Command argument নাও
const rawName = process.argv[2];
if (!rawName) {
  console.log(chalk.red("❌ Provide a module name. Example:"));
  console.log(chalk.yellow("   node cli/generate.ts userProfile"));
  process.exit(1);
}

// 🧩 Helper functions
const toSnakeCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/\s+/g, "_").toLowerCase();

const toPascalCase = (str: string) =>
  str
    .replace(/[-_]+/g, " ")
    .replace(/\s+(.)(\w*)/g, (_m, $1, $2) => $1.toUpperCase() + $2.toLowerCase())
    .replace(/^(.)/, (_m, $1) => $1.toUpperCase());

const snakeName = toSnakeCase(rawName);
const pascalName = toPascalCase(rawName);
const basePath = path.join("src/app", "modules", rawName);
fs.mkdirSync(basePath, { recursive: true });

// ✅ Helper: Create file with loader
const createdFiles: string[] = [];
const createFile = (filePath: string, content: string, label: string) => {
  const spinner = ora(`Creating ${label}...`).start();
  try {
    fs.writeFileSync(filePath, content);
    spinner.succeed(`${label} created ✅`);
    createdFiles.push(path.basename(filePath));
  } catch (err) {
    spinner.fail(`Failed to create ${label}`);
    console.error(err);
  }
};

// 🧩 1. Interface
createFile(
  path.join(basePath, `${rawName}.interface.ts`),
  `export type T_${pascalName} = {
    
  }
  `,
  `${rawName}.interface.ts`
);

// 🧩 2. Schema
createFile(
  path.join(basePath, `${rawName}.schema.ts`),
  `import { Schema, model } from "mongoose";
import { T_${pascalName} } from "./${rawName}.interface";

const ${snakeName}_schema = new Schema<T_${pascalName}>({});

export const ${snakeName}_model = model("${snakeName}", ${snakeName}_schema);
  `,
  `${rawName}.schema.ts`
);

// 🧩 3. Validation
createFile(
  path.join(basePath, `${rawName}.validation.ts`),
  `import { z } from "zod";

const create = z.object({});

export const ${snakeName}_validations = {
  create
};
  `,
  `${rawName}.validation.ts`
);

// 🧩 4. Route
createFile(
  path.join(basePath, `${rawName}.route.ts`),
  `import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { ${snakeName}_controller } from "./${rawName}.controller";
import { ${snakeName}_validations } from "./${rawName}.validation";

const ${snakeName}_router = Router();

${snakeName}_router.post(
  "/create",
  RequestValidator(${snakeName}_validations.create),
  ${snakeName}_controller.create_new_${snakeName}
);

export default ${snakeName}_router;
  `,
  `${rawName}.route.ts`
);

// 🧩 5. Controller
createFile(
  path.join(basePath, `${rawName}.controller.ts`),
  `import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { ${snakeName}_service } from "./${rawName}.service";

const create_new_${snakeName} = catchAsync(async (req, res) => {
  const result = await ${snakeName}_service.create_new_${snakeName}_into_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New ${snakeName} created successfully!",
    data: result,
  });
});

export const ${snakeName}_controller = {
  create_new_${snakeName},
};
  `,
  `${rawName}.controller.ts`
);

// 🧩 6. Service
createFile(
  path.join(basePath, `${rawName}.service.ts`),
  `const create_new_${snakeName}_into_db = () => {
  return {};
};

export const ${snakeName}_service = {
  create_new_${snakeName}_into_db,
};
`,
  `${rawName}.service.ts`
);
// 🧩 6. Swagger
createFile(
  path.join(basePath, `${rawName}.swagger.ts`),
  `
export const ${rawName}SwaggerDocs = {
    "/api/${rawName}/create": {
        post: {
            tags: ["${rawName}"],
            summary: "${rawName} create",
            description: "This is auto generated ${rawName} create API",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["name"],
                            properties: {
                                name: { type: "string", example: "John Doe" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "${rawName} created successfully" },
                400: { description: "Validation error" }
            }
        }
    },
  }


`,
  `${rawName}.swagger.ts`
);

// 🪄 Tree View Output
console.log("\n" + chalk.cyanBright("📁 " + basePath + "/"));
createdFiles.forEach((file, i) => {
  const prefix = i === createdFiles.length - 1 ? " └── " : " ├── ";
  console.log(chalk.gray(prefix + file));
});

// 🧩 7. Auto add route to main router file
const mainRoutePath = path.join("src", "routes.ts");

if (fs.existsSync(mainRoutePath)) {
  let content = fs.readFileSync(mainRoutePath, "utf-8");
  const importLine = `import ${rawName}Route from './app/modules/${rawName}/${rawName}.route';`;
  const routeEntry = `    { path: "/${rawName}", route: ${rawName}Route },`;

  // ✅ Insert import after last existing import
  if (!content.includes(importLine)) {
    const lastImportIndex = content.lastIndexOf("import ");
    if (lastImportIndex !== -1) {
      const nextLineIndex = content.indexOf("\n", lastImportIndex);
      content =
        content.slice(0, nextLineIndex + 1) +
        importLine +
        "\n" +
        content.slice(nextLineIndex + 1);
    } else {
      // যদি কোনো import না থাকে
      content = importLine + "\n" + content;
    }
  }

  // ✅ Insert route entry into moduleRoutes array
  if (!content.includes(routeEntry)) {
    const routesArrayMatch = content.match(/const\s+moduleRoutes\s*=\s*\[/);
    if (routesArrayMatch) {
      const insertPos = routesArrayMatch.index! + routesArrayMatch[0].length;
      content =
        content.slice(0, insertPos) + "\n" + routeEntry + content.slice(insertPos);
    } else {
      console.log(chalk.yellow("⚠️ Could not find moduleRoutes array to insert route."));
    }
  }

  fs.writeFileSync(mainRoutePath, content, "utf-8");
  console.log(chalk.greenBright(`\n🔗 Route added to src/app/routes.ts ✅`));
} else {
  console.log(chalk.yellow(`⚠️ routes.ts not found! Skipped route injection.`));
}


// 🧩 8. Auto add swagger doc to swagger.config.ts
const swaggerPath = path.join("src", "swaggerOptions.ts");

if (fs.existsSync(swaggerPath)) {
  let content = fs.readFileSync(swaggerPath, "utf-8");
  const importLine = `import { ${rawName}SwaggerDocs } from "./app/modules/${rawName}/${rawName}.swagger";`;
  const pathSpread = `...${rawName}SwaggerDocs,`;

  // ✅ 1. Add import if not exists
  if (!content.includes(importLine)) {
    const lastImportIndex = content.lastIndexOf("import ");
    if (lastImportIndex !== -1) {
      const nextLineIndex = content.indexOf("\n", lastImportIndex);
      content =
        content.slice(0, nextLineIndex + 1) +
        importLine +
        "\n" +
        content.slice(nextLineIndex + 1);
    } else {
      content = importLine + "\n" + content;
    }
  }

  // ✅ 2. Add inside `paths` object at the **end**
  if (!content.includes(pathSpread)) {
    const pathsMatch = content.match(/paths\s*:\s*\{([\s\S]*?)\}/m);
    if (pathsMatch) {
      const pathsContent = pathsMatch[1]; // content inside paths {...}
      const insertPos = pathsMatch.index! + pathsMatch[0].lastIndexOf(pathsContent) + pathsContent.length;
      content =
        content.slice(0, insertPos) + `\n            ${pathSpread}` + content.slice(insertPos);
    } else {
      console.log(chalk.yellow("⚠️ Could not find paths object to insert swagger doc."));
    }
  }

  fs.writeFileSync(swaggerPath, content, "utf-8");
  console.log(chalk.greenBright(`\n📘 Swagger doc added to src/swaggerOptions.ts ✅`));
} else {
  console.log(chalk.yellow(`⚠️ swaggerOptions.ts not found! Skipped swagger injection.`));
}



console.log(chalk.greenBright(`\n✅ Module '${rawName}' created successfully!\n`));

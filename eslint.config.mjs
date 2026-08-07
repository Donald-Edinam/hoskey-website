import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const noRawHexRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow raw hex color codes in components. Use CSS custom properties or theme tokens instead.",
    },
    schema: [],
    messages: {
      noRawHex: "Raw hex color '{{hex}}' is forbidden. Use CSS custom properties or theme tokens instead.",
    },
  },
  create(context) {
    const hexRegex = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
    return {
      Literal(node) {
        if (typeof node.value === "string" && hexRegex.test(node.value)) {
          const match = node.value.match(hexRegex);
          context.report({
            node,
            messageId: "noRawHex",
            data: { hex: match ? match[0] : node.value },
          });
        }
      },
      TemplateElement(node) {
        if (node.value && node.value.raw && hexRegex.test(node.value.raw)) {
          const match = node.value.raw.match(hexRegex);
          context.report({
            node,
            messageId: "noRawHex",
            data: { hex: match ? match[0] : node.value.raw },
          });
        }
      },
    };
  },
};

const customRulesPlugin = {
  rules: {
    "no-raw-hex": noRawHexRule,
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      custom: customRulesPlugin,
    },
    rules: {
      "custom/no-raw-hex": "error",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "bun.lock",
  ]),
]);

export default eslintConfig;

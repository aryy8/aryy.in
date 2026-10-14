import next from "eslint-config-next"

const config = [
  ...next,
  { ignores: [".next/**", "node_modules/**", "scripts/**", "convert-images.js"] },
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off",
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",
    },
  },
]
export default config

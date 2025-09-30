module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Deshabilitar warnings innecesarios
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    
    // Reglas específicas para Material-UI
    'react/prop-types': 'off',
    'react/jsx-key': 'warn',
    
    // Reglas para estilos
    'react/style-prop-object': 'off',
    
    // Reglas para hooks
    'react-hooks/exhaustive-deps': 'warn',
    
    // Reglas para JSX
    'react/jsx-no-target-blank': 'warn',
    'react/jsx-no-duplicate-props': 'error',
    
    // Reglas para imports
    'import/no-unresolved': 'off',
    'import/order': 'warn',
    
    // Reglas para variables
    'no-var': 'error',
    'prefer-arrow-callback': 'warn',
    
    // Reglas para funciones
    'func-style': ['warn', 'expression'],
    'arrow-spacing': 'warn',
    
    // Reglas para objetos
    'object-shorthand': 'warn',
    'prefer-template': 'warn',
    
    // Reglas para strings
    'prefer-template': 'warn',
    'template-curly-spacing': 'warn',
    
    // Reglas para arrays
    'array-callback-return': 'warn',
    'prefer-spread': 'warn',
    
    // Reglas para operadores
    'operator-assignment': 'warn',
    'prefer-exponentiation-operator': 'warn',
    
    // Reglas para comparaciones
    'eqeqeq': ['error', 'always'],
    'no-eq-null': 'error',
    
    // Reglas para bloques
    'brace-style': ['warn', '1tbs'],
    'keyword-spacing': 'warn',
    
    // Reglas para espacios
    'indent': ['warn', 2],
    'no-trailing-spaces': 'warn',
    'eol-last': 'warn',
    
    // Reglas para comas
    'comma-dangle': ['warn', 'never'],
    'comma-spacing': 'warn',
    
    // Reglas para punto y coma
    'semi': ['warn', 'always'],
    'semi-spacing': 'warn',
    
    // Reglas para comillas
    'quotes': ['warn', 'single'],
    'jsx-quotes': ['warn', 'prefer-double'],
    
    // Reglas para paréntesis
    'space-in-parens': 'warn',
    'no-extra-parens': 'warn',
    
    // Reglas para llaves
    'object-curly-spacing': 'warn',
    'array-bracket-spacing': 'warn',
    
    // Reglas para operadores ternarios
    'no-unneeded-ternary': 'warn',
    'operator-linebreak': 'warn',
    
    // Reglas para funciones flecha
    'arrow-body-style': 'warn',
    'arrow-parens': 'warn',
    
    // Reglas para destructuring (usar regla del plugin react)
    'prefer-destructuring': 'warn',
    'react/destructuring-assignment': 'warn',
    
    // Reglas para async/await
    'prefer-promise-reject-errors': 'warn',
    'no-return-await': 'warn',
    
    // Reglas para promesas (desactivadas si no está el plugin instalado)
    // 'promise/always-return': 'warn',
    // 'promise/no-return-wrap': 'warn',
    
    // Reglas para React
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-vars': 'warn',
    'react/no-array-index-key': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/self-closing-comp': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-curly-spacing': 'warn',
    'react/jsx-equals-spacing': 'warn',
    'react/jsx-first-prop-new-line': 'warn',
    'react/jsx-indent': 'warn',
    'react/jsx-indent-props': 'warn',
    'react/jsx-max-props-per-line': 'warn',
    'react/jsx-no-bind': 'warn',
    'react/jsx-no-literals': 'off',
    'react/jsx-pascal-case': 'warn',
    'react/jsx-sort-props': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    
    // Reglas para hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Reglas para accessibility
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/heading-has-content': 'warn',
    'jsx-a11y/html-has-lang': 'warn',
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/no-access-key': 'warn',
    'jsx-a11y/no-redundant-roles': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'jsx-a11y/tabindex-no-positive': 'warn'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};

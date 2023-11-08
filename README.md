# 🧮 take-home-table

![take-home-table](doc/take-home-table.png)

```javascript
const columns: TakeHomeTableColumn[] = [
    {
        fieldName: "id",
        label: "ID",
        sortable: true, // makes column header a sort button
    },
    {
        fieldName: "description",
        label: "Description",
        filterable: true, // makes column searchable with a text input above table
        // Component to render longer text, using ellipsis when too long and providing mouseover title.
        Renderer: TextRenderer,
    },
    {
        fieldName: "rating",
        label: "Rating",
        title: "Rating out of 5",
        sortable: true,
        // Component to express rating as star icons 
        Renderer: RatingRenderer,
    }
];

// table is configured mostly via its columns and data is provided (and state is managed) via a TakeHomeDataProvider
const Products = () => (
    <TakeHomeDataProvider resource="products">
        <TakeHomeTable columns={columns} autoFocus/>
    </TakeHomeDataProvider>
);
```

## Annotated Features

![take-home-table annotated](doc/take-home-table-annotated.png)

1. Filter by one field based on debounced user input, escape key to clear
2. Button to toggle column sort between ascending, descending and off
3. Item selection, persists across pages and sorting (but reset on filter)
4. Custom JSX cell rendering
5. "
6. "
7. Change page size
8. Pagination controls

## Feature Mini-Demos

### Filtering

![filtering](doc/filtering.gif)

### Sorting

![sorting](doc/sorting.gif)

### Item Selection

![item selection](doc/selection.gif)

### Pagination

![pagination](doc/pagination.gif)

## Installation



```bash
git clone https://github.com/bargar/take-home-table.git
cd take-home-table
yarn
yarn dev
```

Point your browser at http://localhost:5173 or the alternative port Vite tells you it's running on. 

# Stack

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

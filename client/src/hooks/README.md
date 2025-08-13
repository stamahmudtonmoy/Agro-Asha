# useCategory Hook

A custom React hook for managing categories data in the AKR application.

## Overview

The `useCategory` hook is designed to fetch and manage categories from the API. It automatically fetches categories when the component mounts and provides them to components that use it.

## Features

- **Automatic Data Fetching**: Fetches categories on component mount
- **State Management**: Manages categories state internally
- **Error Handling**: Gracefully handles API errors
- **Type Safety**: Full JSDoc documentation with TypeScript-like annotations

## Usage

```jsx
import useCategory from '../hooks/useCategory';

function CategoryList() {
  const categories = useCategory();
  
  return (
    <div>
      {categories.map(category => (
        <div key={category._id}>{category.name}</div>
      ))}
    </div>
  );
}
```

## API

### Return Value

- **Type**: `Array`
- **Description**: Array of category objects fetched from the API
- **Default**: Empty array `[]`

### Internal Functions

#### `getCategories()`

- **Type**: `async function`
- **Description**: Fetches categories from the API endpoint
- **Endpoint**: `GET /api/v1/category/get-category`
- **Error Handling**: Logs errors to console, maintains current state

## JSDoc Documentation

The hook is fully documented using JSDoc standards, including:

- Function description and purpose
- Parameter types and descriptions
- Return value documentation
- Usage examples
- Author and version information
- Internal function documentation

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run only useCategory tests
npm test -- --testPathPattern=useCategory.test.js

# Run tests with coverage
npm test -- --testPathPattern=useCategory.test.js --coverage

# Run tests in watch mode
npm test -- --testPathPattern=useCategory.test.js --watch
```

### Test Coverage

The `useCategory` hook has **100% test coverage** across all metrics:

- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

### Test Categories

1. **Initial State**
   - Verifies hook initializes with empty array

2. **API Call on Mount**
   - Ensures API is called when hook mounts
   - Verifies state updates with API response

3. **Error Handling**
   - Tests graceful error handling
   - Maintains state on API failures

4. **Data Structure Handling**
   - Handles undefined/null responses
   - Processes empty arrays correctly

5. **Hook Behavior**
   - Single API call on mount
   - Consistent reference on re-renders

6. **Edge Cases**
   - Network timeouts
   - Malformed API responses

### Test Dependencies

- `@testing-library/react` - For testing React hooks
- `jest` - Testing framework
- `axios` - HTTP client (mocked in tests)

## Implementation Details

### State Management

```javascript
const [categories, setCategories] = useState([]);
```

### API Integration

```javascript
const { data } = await axios.get("/api/v1/category/get-category");
setCategories(data?.category);
```

### Effect Hook

```javascript
useEffect(() => {
  getCategories();
}, []); // Empty dependency array ensures single execution
```

## Error Handling

The hook implements defensive programming practices:

- **Try-Catch Blocks**: Wraps API calls in error handling
- **Optional Chaining**: Uses `data?.category` for safe property access
- **Graceful Degradation**: Maintains current state on errors
- **Error Logging**: Logs errors for debugging purposes

## Performance Considerations

- **Single API Call**: Hook only fetches data once on mount
- **State Reference**: Returns same reference on re-renders
- **Minimal Re-renders**: Only updates state when necessary

## Future Enhancements

Potential improvements for the hook:

1. **Loading State**: Add loading indicator support
2. **Refresh Function**: Manual refresh capability
3. **Caching**: Implement data caching strategies
4. **Pagination**: Support for large category lists
5. **Real-time Updates**: WebSocket integration for live updates

## Contributing

When modifying the hook:

1. Update JSDoc documentation
2. Add corresponding tests
3. Ensure 100% test coverage
4. Follow existing code patterns
5. Test error scenarios thoroughly

## License

This hook is part of the AKR application and follows the project's licensing terms.

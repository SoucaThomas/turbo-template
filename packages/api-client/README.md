# API Client Package

Auto-generated API client for TanStack Query based on your NestJS backend's OpenAPI specification.

## Features

-   🚀 Auto-generated TypeScript types from OpenAPI spec
-   🔧 Axios-based HTTP client with interceptors
-   📦 Ready-to-use with TanStack Query
-   🎯 Full type safety for all API endpoints

## Installation

```bash
# From the root of your turbo repo
pnpm add @turbo-template/api-client@workspace:*
```

## Usage

### Basic Usage

```typescript
import { defaultApiClient } from "@turbo-template/api-client";

// Make API calls
const data = await defaultApiClient.get("/api/users");
```

### With TanStack Query

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { defaultApiClient } from "@turbo-template/api-client";

// Query hook
export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => defaultApiClient.get("/api/users"),
    });
};

// Mutation hook
export const useCreateUser = () => {
    return useMutation({
        mutationFn: (userData: any) => defaultApiClient.post("/api/users", userData),
    });
};
```

### Custom Configuration

```typescript
import { ApiClient } from "@turbo-template/api-client";

const customClient = new ApiClient("https://api.example.com", {
    headers: {
        Authorization: "Bearer your-token",
    },
});
```

## Regenerating Types

When your API changes, regenerate the types from the root of your monorepo:

```bash
# From the root directory
pnpm run api:generate-types

# Or from within the api-client package
cd packages/api-client
pnpm run generate-types
```

## Building

```bash
pnpm run build
```

## Development

```bash
pnpm run dev  # Watch mode
pnpm run clean  # Clean dist folder
```

## API Endpoints

The available endpoints are automatically generated from your OpenAPI specification. Check the `types.ts` file for the complete list of available operations and their types.

## Workflow

1. **Development**: Make changes to your NestJS backend
2. **Generate Types**: Run `pnpm run api:generate-types` from the root
3. **Build**: The package automatically rebuilds with new types
4. **Use**: Import and use the updated API client in your frontend

## File Structure

```
packages/api-client/
├── src/
│   ├── types.ts          # Auto-generated types from OpenAPI
│   ├── client.ts         # Axios-based HTTP client
│   └── index.ts          # Main exports
├── openapi-spec.json     # Generated OpenAPI spec (gitignored)
├── package.json          # Package configuration
└── README.md             # This file
```

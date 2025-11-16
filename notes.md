next js is uses react for building user interfaces
it provides additional features that emable us to build production ready application
these features include routing,optimized rendering,data fetching,bundling,compiling and more
you don't have to install additional packages as next.js provides everything you need
opinions and conventions should be followed to implement these features

Server Components
-Rendered Exclusively on the server
-Never Sent to the client
-Faster Page Loads
-Can't use interactivity features like useState or useEffect
-server components are the default
-used for fetching data
-accessing backend resources
-keeping sensitive informmation on the server

Client Components
-rendered in the browser
-rendered in the html once on the server
-immediately see the page's html content rather than a blank screen
-can use state,effects and browser-only APIs
-add 'use client' directive at the the top of your file
-interactivity
-using hooks like useState or useEffect
-using browser-only APIs

Routing
Next.js has a file-system based routing mechanism
the way we organise our files and folders determines the routes of our application
routing conventions
-all routes must be placed inside the app folder
-every file that represents a route should be named page.js or page.tsx
-every folder corresponds to a path segment in the browser url

Layouts
-layouts allow you to define UI that is shared between multiple pages
-useful for elements like headers,footers or navigation menus that you want to appear consistently across different routes
-when navigating between pages that share a layout,only the page components update-the layout doesn't re-render
-this leads to improved performance and a smoother user experience

ROUTE HANDLERS
-route handlers allow us to create custom request handlers for our application
-unlike page routes,which respond with HTML content,route handlers allow us to create Restful endpoints
-gives us fulll control over the response without the need for a separate backend setup
-perfect for handling everything from form submissions and database queries to authentication and authorization,secure interactions with third-part APIs
-by running server-side,they ensure sensitive information like API keys remains protected

## DATA FETCHING

Server components are the preferred choice for data fetching in next.js
-reduced bundle size
-lower latency
-improved seo
-direct access to backend resources
-and the ability to secure sensitive data
Opt for client components for data fetching only when it's absolutely necessary such as when you need real-time updates or when the data depends on the client side interactions that can't be ppredicted server side

Server Actions
-they are asynchronous functions that are executed on the server
-they allow us to define and execute server-side logic directly from our components
-they're incredibly useful for handling form submissions,updating databases or any operation that requires server-side execution

Authentication
-sign up
-sign in
-sign out
-manage account
-show UI elements based on auth status
-protect routes based on auth status
-read session and user data

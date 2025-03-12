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

Client Components
-rendered in the browser
-rendered in the html once on the server
-immediately see the page's html content rather than a blank screen
-can use state,effects and browser-only APIs
-add 'use client' directive at the the top of your file

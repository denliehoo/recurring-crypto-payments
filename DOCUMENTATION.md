# Database

- Go to mongodb atlas to create an account: https://cloud.mongodb.com/
- Create a cluster
- Create an admin account during cluster creation (if havent) and assign it to the account
- In that cluster dashboard, click CONNECT -> choose MongoDB for VS Code -> you'll see what is the connection string there (e.g. mongodb+srv://usernamehere:password@yourclusterdetails.mongodb.net/)
- copy that connection string and replace password with the password you created for the admin account and place it in your envrionment variabls
- Go back to the atlas dashboard -> scroll down on the side bar to security -> choose network access
- Add this IP Address: 0.0.0.0/0 ; this will allow access from any IP address. By default, only the IP address of which you created the admin account will be there and this is for a security reason. Without allowing access from all IP addresses, when your server is deployed, you'll run into errors.

# Server deployment

## First deployment

Server deployment is done using Render

- https://dashboard.render.com/
- New > Web Service
- Connect to github repository
- Build & Deploy settings:

  - Branch: main
  - root directory: apps/server
  - build command: cd ../.. && pnpm install --frozen-lockfile && cd apps/server && pnpm build
  - start command: pnpm prod-dist
  - auto-deploy: no [can be yes if want]
  - Note: The reason why we chose to specify a root directory is so that the .env.prod file can be detected and also to prevent unnecessary trigger of auto-deployment

- Add environmental values that are already in the server. In addition add this environmental value:
  - NODE_VERSION=22.14.0
- Deploy it and wait
- To redeploy: push commit to github, click on manual deploy on the webserver > deploy latest commit > wait and done

# Frontend deployment

## First deployment

- npm i -g firebase-tools
- firebase login
- firebase init hosting
- public directory: doesn't matter for now
- configure as single page app: yes
- then manually configure firebase.json to suit the monorepo
- To Build and deploy:
- pnpm build:dashboard
- pnpm build:checkout
- firebase deploy --only hosting:dashboard,hosting:checkout
- Note: we can doing host:dashboard because we specified where our built assets are in our firebase.json config

- To redeploy:
- repeat the above

<!-- - refer to : https://hackernoon.com/how-to-deploy-a-react-application-with-firebase-hosting-p92m37b7 -->

# DNS

- Usually, we can maange our DNS in godaddy (where we bought the domain)
- However, because I've currently given the nameserver management to Vercel (for personal portfolio project) godaddy no longer manages the DNS records.
- Thus, need to manage DNS in vercel instead: https://vercel.com/denliehoo/~/domains/denliehoo.com
-

# AWS Cron

- Go to AWS Lambda > Functions > Create Function and call the API [Code below]
- In function > function overview > click add trigger > select EventBridge
- Create new rule > Schedule Expression > Schedule Expression: rate(1 hour) [basically one every hour] > Done
- If want to edit/end: go to the lambda function > click on the EventBridge > Select the Trigger (in Configurations tab) > click on the create schedule api > edit and save accordingly

```Javascript
import https from "https";

export const handler = async (event) => {
  const apiKey = "API_KEY_HERE";
  const apiUrl = 'BASE_SERVER_URL_HERE';
  const path = '/payments/cron-api';

  const options = {
    method: 'POST',
    path: path,
    headers: {
      'Authorization': apiKey
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(apiUrl + path, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('Response Status:', res.statusCode);
        console.log('Response Data:', data);
        resolve(data);
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error);
      reject(error);
    });

    req.end();
  });
};
```

# Note on testing external frontend

- Can test external frontend manually by calling the get subscription page api along with the vendor , vendorclient and apikeys. Simply reseed the database and call the get all vendor clients api to get the the details, then input into the subscription page api

# Mailer documentation

- refer to: https://miracleio.me/snippets/use-gmail-with-nodemailer

<!--
Part 1: Deploying the Backend Server to Render
Render is well-suited for monorepos. You'll create a single "Web Service" and tell it which subdirectory contains your server.

Sign up and Connect Your Git Repository:

Create an account on Render.com.

Go to your Dashboard and click New > Web Service.

Connect the GitHub/GitLab repository containing your recurring-crypto-payments project.

Configure the Web Service:
Render will ask for the settings for your new service. This is the most crucial part.

Name: recurcrypt-api (or similar).

Region: Choose a region close to you or your users.

Branch: main (or your primary deployment branch).

Root Directory: Leave this blank. Render needs to run pnpm commands from the root of your monorepo to correctly link the workspaces.

Runtime: Node.

Build Command: This command installs all dependencies and builds only the server.

Bash

pnpm install --frozen-lockfile && pnpm --filter server build
(Note: Your package.json has a prod:server script but not a build:server script. I'm assuming your server has its own build script in its apps/server/package.json, for example, to compile TypeScript. If not, add one there.)

Start Command: This is the command to run your production server. Your prod:server script is perfect for this.

Bash

pnpm --filter server prod
Instance Type: Free

Add Environment Variables:

Click Advanced Settings.

If your server needs any environment variables (like a database URL, JWT secret, etc.), add them in the "Environment Variables" section. For example, you'll likely need to set NODE_ENV to production.

Deploy:

Click Create Web Service. Render will pull your code, run the build and start commands, and deploy your server.

Once live, it will be available at a URL like recurcrypt-api.onrender.com. We'll add the custom domain later.

Part 2: Deploying the Frontend Apps to Firebase
Firebase Hosting can host multiple sites within a single project, which is exactly what you need for dashboard and checkout.

Install Firebase CLI:
If you don't have it, install it globally.

Bash

npm install -g firebase-tools
Login and Initialize Firebase:

firebase login

In the root of your monorepo, run: firebase init hosting

Select a project: Choose "Use an existing project" (if you have one) or "Create a new project". Let's call it recurcrypt.

Public directory: This doesn't matter yet, as we will configure it manually. You can enter apps/dashboard/build for now.

Configure as a single-page app (rewrite all urls to /index.html)?: Yes.

Set up automatic builds and deploys with GitHub?: No. We'll do this manually for now to understand the process.

Configure firebase.json for Multiple Sites:
This is the key step. Replace the generated firebase.json file with the following configuration. This defines two hosting targets: dashboard and checkout.

JSON

{
  "hosting": [
    {
      "target": "dashboard",
      "public": "apps/dashboard/dist",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    },
    {
      "target": "checkout",
      "public": "apps/checkout/dist",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  ]
}
Important: Double-check the public directory path. If your build tool (like Vite or Create React App) outputs to a build folder instead of dist, change dist to build in the file above.

Create and Link Firebase Hosting Sites:

In your browser, go to the Firebase Console for your project. In the "Hosting" section, you'll see one default site. You need two.

Click Add another site for both your dashboard and checkout pages. Name them something clear, like recurcrypt-dashboard and recurcrypt-checkout.

Now, link these sites to your local configuration targets using the CLI:

Bash

# Format: firebase target:apply hosting <target-name> <site-name-in-firebase>
firebase target:apply hosting dashboard recurcrypt-dashboard
firebase target:apply hosting checkout recurcrypt-checkout
Build and Deploy:

First, build both frontend applications from your monorepo root:

Bash

pnpm build:dashboard
pnpm build:checkout
Now, deploy both sites to Firebase:

Bash

firebase deploy --only hosting:dashboard,hosting:checkout
Firebase will deploy the contents of apps/dashboard/dist to the dashboard site and apps/checkout/dist to the checkout site.

Part 3: DNS and Custom Domain Configuration
The final step is to point your custom subdomains to the correct services. You'll do this in your domain registrar's DNS settings (e.g., GoDaddy, Namecheap, Google Domains).

For the Render Backend (recurcrypt-api.denliehoo.com):

In the Render dashboard for your recurcrypt-api service, go to the Settings tab.

Scroll to "Custom Domains" and add recurcrypt-api.denliehoo.com.

Render will give you a value to add as a CNAME or A record in your DNS settings. Follow their instructions.

For the Firebase Frontends:

In the Firebase Console, go to the Hosting section.

You will see your two sites (recurcrypt-dashboard and recurcrypt-checkout).

For the recurcrypt-dashboard site, click Add custom domain.

Enter recurcrypt-dashboard.denliehoo.com. Firebase will ask you to add a TXT record to your DNS to verify ownership, and then A records that point to Firebase's servers.

Repeat the exact same process for the recurcrypt-checkout site, adding the recurcrypt-checkout.denliehoo.com custom domain.

After you've added the DNS records, it may take anywhere from a few minutes to a few hours for the changes to propagate. Once complete, your sites will be live at their new domains.

Final Workflow Summary
Your development and deployment workflow will now look like this:

Develop: Work on your code locally in your monorepo.

Build: Run pnpm build:dashboard && pnpm build:checkout to prepare the frontends.

Deploy:

Pushing to your main branch will automatically trigger a new build and deployment on Render for your backend.

Run firebase deploy --only hosting:dashboard,hosting:checkout to deploy your frontends.

For a more advanced setup, you can create a GitHub Action to automate the Firebase deployment whenever you push to your main branch, creating a full CI/CD pipeline.

 -->

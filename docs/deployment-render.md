# Deploying Linguisita on Render

This guide explains how to deploy the Linguisita application on [Render](https://render.com/), a cloud platform that makes it easy to deploy web applications.

## Prerequisites

1. A [Render](https://render.com/) account
2. A [Supabase](https://supabase.com/) project already set up (follow the instructions in `server/README.md`)
3. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Deploy the React Frontend

1. Log in to your Render dashboard
2. Click on "New" and select "Static Site"
3. Connect your Git repository
4. Configure the deployment:
   - **Name**: `linguisita` (or your preferred name)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
5. Add the following environment variables:
   - `REACT_APP_SUPABASE_URL`: Your Supabase project URL
   - `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase project anon key
6. Click "Create Static Site"

Render will automatically build and deploy your React application. Once the deployment is complete, you'll get a URL like `https://linguisita.onrender.com` where your application is accessible.

### 2. Configure CORS in Supabase

To allow your Render-hosted frontend to communicate with Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Under "API Settings", add your Render URL to the "Additional Allowed Hosts" section
4. Save the changes

## Custom Domain (Optional)

If you want to use a custom domain for your application:

1. In your Render dashboard, go to your static site
2. Click on "Settings" and then "Custom Domain"
3. Follow the instructions to add and verify your domain

## Continuous Deployment

Render automatically sets up continuous deployment. Whenever you push changes to your Git repository, Render will automatically rebuild and redeploy your application.

## Troubleshooting

### CORS Issues

If you encounter CORS issues:
- Make sure your Render URL is added to the allowed hosts in Supabase
- Check that your environment variables are correctly set in Render

### Build Failures

If your build fails:
- Check the build logs in Render
- Ensure all dependencies are correctly listed in your `package.json`
- Verify that your build command is correct

### Authentication Issues

If authentication doesn't work:
- Verify that your Supabase URL and anon key are correctly set as environment variables
- Check that your Supabase project is properly configured for authentication

## Monitoring and Logs

Render provides logs and metrics for your deployed application:

1. Go to your static site in the Render dashboard
2. Click on "Logs" to view the deployment and build logs
3. Use these logs to diagnose any issues with your deployment

## Scaling (Future Considerations)

As your application grows:

1. Consider upgrading your Render plan for better performance
2. Scale your Supabase project as needed
3. Implement caching strategies for improved performance

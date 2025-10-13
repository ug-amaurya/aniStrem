# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for your anime streaming application.

## Prerequisites

- A MongoDB Atlas account (free tier available)
- Node.js and npm installed
- Your application code

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project (e.g., "AniStream")

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select a cloud provider and region (choose closest to your users)
4. Give your cluster a name (e.g., "anistream-cluster")
5. Click "Create"

## Step 3: Set Up Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Select "Read and write to any database"
6. Click "Add User"

## Step 4: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. For production, add your server's IP address
5. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as driver
5. Copy the connection string

## Step 6: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
MONGODB_DB=anistream

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Email configuration for password reset
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

Replace the placeholders with your actual values:

- `<username>`: Your database username
- `<password>`: Your database password
- `<cluster-url>`: Your cluster URL
- `<database-name>`: Your database name (e.g., "anistream")

## Step 7: Install Dependencies

```bash
npm install
```

## Step 8: Email Configuration (Optional)

For password reset functionality, configure email:

### Gmail Setup:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_SERVER_PASSWORD`

### Other Email Providers:

Update the email configuration in `.env.local` for your provider.

## Step 9: Test the Connection

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Try to sign up a new user
3. Check your MongoDB Atlas dashboard to see if data is being created

## Database Collections

The application will automatically create these collections:

- **users**: User accounts and profiles
- **animes**: Anime information and metadata
- **episodes**: Episode details and streaming sources

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use strong passwords** for database users
3. **Restrict network access** in production
4. **Rotate JWT secrets** regularly
5. **Use environment-specific configurations**

## Troubleshooting

### Connection Issues:

- Verify your connection string is correct
- Check if your IP is whitelisted
- Ensure your database user has proper permissions

### Email Issues:

- Verify email credentials
- Check if 2FA is enabled for Gmail
- Test with a simple email first

### Authentication Issues:

- Ensure JWT_SECRET is set
- Check if user exists in database
- Verify password hashing

## Production Deployment

1. **Use environment variables** for all sensitive data
2. **Restrict database access** to your server IPs only
3. **Use a dedicated email service** (SendGrid, AWS SES, etc.)
4. **Enable MongoDB Atlas monitoring**
5. **Set up database backups**

## Support

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

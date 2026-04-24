# hemanthsrp.com

My personal everything site.

## Contact form setup

The contact form API route at `/api/contact` requires these environment variables:

- `EMAIL_USER` (Gmail address used to send mail)
- `EMAIL_PASS` (Gmail app password, not your normal account password)
- `EMAIL_TO` (recipient address)

### Local development

Create a `.env.local` file with:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=your-email@gmail.com
```

### Vercel deployment

Add the same variables in Vercel Project Settings -> Environment Variables for the environments you use (Preview and/or Production), then redeploy.

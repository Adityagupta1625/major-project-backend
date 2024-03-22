import { google } from "googleapis"

const SCOPES = [
    'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.resource',
    'https://www.googleapis.com/auth/forms.body',
  ]

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: process.env.GOOGLE_FORM_TYPE,
      project_id: process.env.GOOGLE_FORM_PROJECT_ID,
      private_key_id: process.env.GOOGLE_FORM_PRIVATE_KEY_ID,
      private_key: (process.env.GOOGLE_FORM_PRIVATE_KEY as string).replace(
        /\\n/g,
        '\n'
      ),
      client_email: process.env.GOOGLE_FORM_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_FORM_CLIENT_ID,
      universeDomain: process.env.GOOGLE_FORM_UNIVERSE_DOMAIN,
    },
    scopes: SCOPES,
  })

export default auth
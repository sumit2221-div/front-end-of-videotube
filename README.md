# VideoTube
VideoTube is a React application that allows users to upload and watch videos, log in with an access token, comment on videos, like videos, share videos to WhatsApp, tweet about videos, and interact with tweets. The application uses Redux for state management and Axios for API integration.

 # Features
User Authentication: Log in and handle access tokens.
Video Uploading: Upload your own videos.
Video Watching: Watch uploaded videos.
Commenting: Add comments to videos and tweets.
Liking: Like videos and tweets.
Sharing: Share videos to WhatsApp.
Tweeting: Tweet about videos and interact with tweets.
Technologies Used
React: Frontend library for building user interfaces.
Redux: State management library.
Axios: HTTP client for making API requests.
Tailwind CSS: Utility-first CSS framework for styling.
React Router: Library for routing.
Redux Thunk: Middleware for handling asynchronous actions.
Installation
 # Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/videotube.git
cd videotube
Install dependencies:

sh
Copy code
npm install
Create a .env file in the root directory and add your environment variables:

sh
Copy code
REACT_APP_API_URL=https://your-api-url.com
Start the development server:

sh
Copy code
npm start
 # Usage
Login: Users can log in using their credentials to get an access token.
Upload Videos: Once logged in, users can upload their own videos.
Watch Videos: Users can browse and watch videos uploaded by others.
Comment and Like: Users can comment on and like videos and tweets.
Share to WhatsApp: Users can share videos to WhatsApp.
Tweet and Interact: Users can tweet about videos and interact with tweets (like, comment).
API Endpoints
Login: /api/v1/auth/login
Current User: /api/v1/users/current-user
Upload Video: /api/v1/videos/upload
Fetch Videos: /api/v1/videos
Comment on Video: /api/v1/comments/video
Like Video: /api/v1/likes/video
Tweet: /api/v1/tweets
Fetch Tweets: /api/v1/tweets
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

License
This project is licensed under the MIT License.


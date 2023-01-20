/**
 * Welcome page for the application.
 * @author Yousuf Kalim
 */
import { APP_NAME } from '@config';

const welcomePage = `<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
            'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .Hero {
            text-align: center;
        }

        .Hero-logo {
            height: 40vmin;
            pointer-events: none;
            margin-bottom: 10px;
        }

        @media (prefers-reduced-motion: no-preference) {
            .Hero-logo {
                animation: Hero-logo-spin infinite 20s linear;
            }
        }

        .Hero-header {
            background-color: #282c34;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
        }

        .Hero-header p {
            font-size: 20px;
            line-height: 2.5;
        }

        @keyframes Hero-logo-spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>
<div class="app">
    <div class="Hero">
        <header class="Hero-header">
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968322.png" class="Hero-logo" alt="logo" />
            <h4>Welcome to ${APP_NAME}</h4>
            <p>This is the main route of the application.</p>
        </header>
    </div>
</div>
</body>
</html>
`;

export default welcomePage;

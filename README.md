# Memory Game

Take-home assignment for DRCS

## Setup

```sh
git clone https://github.com/tohhongxiang123/drcs-memory-game
cd drcs-memory-game

npm install
npm run dev
```

## Task Description

### Problem Statement

Your task is to create a web-based memory game using React JS. In this game, players are presented with a grid of squares, some of which are colored green. The objective is for the user to memorize the locations of the green squares within a given countdown time. After the countdown, the green squares will vanish, and players need to click on the squares where the green ones were located. Success in remembering all green squares advances the player to the next level, which increases in difficulty.

-   Level 1: 3x3 grid, 3 green squares
-   Level 2: 3x3 grid, 4 green squares
-   Level 3: 4x4 grid, 4 green squares
-   Level 4: 4x4 grid, 5 green squares
-   Level 5: 4x4 grid, 6 green squares
-   Level 6: 5x5 grid, 5 green squares
-   Level 7: 5x5 grid, 6 green squares
-   Level 8: 5x5 grid, 7 green squares
-   Level 9: 6x6 grid, 6 green squares
-   Level 10: 7x7 grid, 7 green squares

### Game Requirements

-   **Welcome Screen**: Design a responsive welcome screen with the game's rules, instructions, and a "Start Game" button.
-   **Game Interface**: Utilize CSS Grid or Flexbox to display a responsive grid of squares with randomly positioned green squares.
-   **Countdown Timer**: Implement a countdown timer that starts from a predefined time and updates in real-time. Use React state to manage the timer.
-   **Gameplay Mechanics**: After the countdown, make the green squares disappear. Allow players to click on the grid squares to mark their guesses.
-   **Validation**: Include logic to check if the player's selected squares match the original green squares' positions.
-   **Feedback**: Provide immediate feedback to the player on success or failure in identifying the correct squares.
-   **Level Progression**: On successful completion, increase the game's difficulty by adding more squares or reducing the timer and display the current level to the player.
-   **Retry Mechanism**: Implement a "Restart" or "Play Again" option for players to retry the game upon failure.
-   **Score Tracking**: Optionally, track and display the player's progress, such as the number of attempts or the time taken to complete each level.

### Submission Guidelines

-   **Code Submission**: Upload your project to a private GitHub repository and add https://github.com/1-2naan as collaborator.
-   **README**: Include a README.md file with detailed instructions on how to set up and run your game locally. This should cover any prerequisites, installation steps, and how to start the game.
-   **Demo Video**: Record a brief demo video showcasing your game. This video should highlight the main features, game flow, and any additional enhancements you've made.
-   **Deployment (Optional)**: For bonus points, deploy your game to a web hosting service, making it accessible online. Include the live URL in your submission email and README. Free hosting services like Netlify, Vercel, or GitHub Pages are recommended for ease of use and integration with GitHub.
-   **Completion Notification**: Once you've completed the assignment, email us your resume, demo video, GitHub repository link, and (if applicable) the live URL of your deployed game.

### Evaluation Criteria

-   **Functionality**: Does the game meet the specified requirements and function as intended? This includes the core game mechanics, user interface, and responsiveness across devices.
-   **Code Quality**: Is the code well-organized, readable, and maintainable? We’ll look at your use of React JS best practices, component structure, and state management.
-   **User Interface**: Is the game visually appealing and easy to navigate? A user-friendly design and smooth interactions are key.
-   **Error Handling**: How well does your game manage errors and edge cases? Robust error handling contributes to a polished user experience.
-   **Best Practices**: We’ll assess the adherence to development and security best practices, including but not limited to proper management of environment variables, use of secure connections (HTTPS), and efficient resource usage.
-   **Creativity and Innovation**: Extra points for creativity, whether through game design, features, or the use of technology. Show us what makes your game unique!
-   **Deployment (Optional)**: Successfully deploying your game will earn you bonus points. We’re interested in your ability to take a project from development to a live environment, including the use of modern deployment practices and tools.

### Good to Have

-   Incorporate animations for transitions, success, or failure states to enhance user engagement.
-   Add sound effects for game actions to improve the user experience.
-   Consider using TypeScript for development to leverage type safety and enhance code quality.

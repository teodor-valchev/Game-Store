
# Game Store

Game Store is an Express-based application that allows users to manage and trade game codes. This README provides information on setup, usage, and development.

## Functionality

- User Authentication: Register, login, and logout functionalities.
- Game Management: Create, edit, delete, and view game offers.
- Responsive Design: HTML and CSS for dynamic and responsive pages.
- RESTful API: Endpoints for managing game data.

## Security Requirements

`Access Control`: Different pages and functionalities are accessible based on user authentication status.

## Validation and Error Handling

- `User`: Validate username, email, password, and confirmation.
- `Game`: Validate platform, name, image, price, genre, and description.

## Bonus Features

`Search`: Logged-in users can search and filter game offers by name and platform
## Functional Requirements

- Guests: View home page, catalog, and details; register and login.
- Logged-in Users: Create, edit, delete offers; buy games; view details with appropriate buttons based on ownership.

## Routing

- `/` - the main page (should visualize all the game in the database and a search field)
- `/games/catalog` – List all games 
- `/games/search` – should render the search page
- `/games/create` – should render the create game form
- `/games/details/:id` – should render the details page about selected game
- `/games/edit/:id` - should render the edit page about selected game
- `/games/delete/:id` - should delete the specified game
- `/users/register` - should render register page
- `/users/login` - should render login page
- `/users/logout` - should logout user
- `Any other` - should render the 404 not found page

## Models
Game:

- `_id`: Unique identifier (ObjectId)
- `name`: Required string representing the game's name
- `description`: Additional information about the game (string)
- `image`: Reference to an image displaying the game (string)
- `genre`: Reference to the genre of the game (string)
- `platform`: Reference to the platform of the game (string)
- `boughtBy`: Collection of users (references to the "User" model) (array)
- `owner`:  Reference to the "User" model (ObjectId)

User:

- `_id`: Unique identifier (ObjectId)
- `username`: Required string representing the user's name (string)
- `email`: Required string representing the user's email (string)
- `password`: Required string representing the user's password (string)

name, image, price, description, genre, platform, boughtBy, owner
## Run Locally

Clone the project

```bash
  git clone https://github.com/teodor-valchev/Game-Store.git
```

Go to the project directory

```bash
  cd Game-Store
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
Open your browser and navigate to http://localhost:3000

## Tech Stack

**Client:** HTML, CSS, JavaScript, Handlebars

**Server:** Node, Express, MongoDB with Mongoose
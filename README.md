# Coding Challenge Application Intergrate With Github API

This project consists of a React front-end and an Express back-end. The goal is to provide a way for users to search for Github users, like their profiles, and see a list of their liked profiles.

## Front-end
The front-end was built using Create-React-App and includes the following features:
- A form for entering a phone number and access code
- Validation of the access code by calling the back-end
- A top navigation bar with a search bar and profile icon
- A table or grid display of search results, including the id, login, avatar_url, html_url, public_repos, and followers for each user
- Pagination for the search results
- The ability to like a Github profile by clicking on a heart icon
- A modal or page showing the user's phone number and list of liked Github profiles
## Back-end
The back-end was built using Express and includes the following endpoints:
- ```POST: /user/new-access-code```
- Parameters: phoneNumber
- Returns: a random 6-digit access code
Saves the access code to the phone number in the database

- ```POST: /user/validate-access-code```
- Parameters: accessCode, phoneNumber
- Returns: { success: true }
- Sets the access code to an empty string after validation
  
  
- ```GET: /github/search-github-users```
- Parameters: q (search term), page (page number), per_page (results per page)
- Returns: an array of users with login names that contain the search term
  
- ```GET: /github/find-github-user-profile/:github_user_id```
- Parameters: github_user_id
- Returns: login, id, avatar_url, html_url, public_repos, and followers for a Github user
  
- ```POST: /github/like-github-user```
- Parameters: phone_number, github_user_id
- Returns: 200 code
  
- ```GET: /user/get-user-profile```
- Parameters: phone_number
- Returns: a list of favorite Github users for a registered user
## Running the Project
Clone the repository to your local machine using:
```
git clone https://github.com/<repo-name>.git.
```

To run the project, you will need to start the back-end on <b>port 3003</b> and the front-end on <b>port 3000</b>.
- Clone the repository
- Navigate to the root project folder and install the dependencies

```
cd <project-directory>
npm install
```
- Start the back-end on port 3003
``` 
npm start
```
- Navigate to the front-end folder and install the dependencies
```
cd ./client
npm install
```
- Start the front-end on port 3000
```
npm start
```
The application should now be running on ```http://localhost:3000``` and connecting to the back-end on ```http://localhost:3003```.

## To test the API endpoints 
You can use a tool such as <a href="https://www.postman.com/">Postman</a>. The available endpoints and the required parameters are described in the Back-end section of this README.

## Some screenshot from application
![My Image](../skipli-coding-challenge/client/public/Screen%20Shot%202023-02-08%20at%2017.07.55.png)
![My Image](../skipli-coding-challenge/client/public/Screen%20Shot%202023-02-08%20at%2017.07.45.png)
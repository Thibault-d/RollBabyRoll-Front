# Project Name

## Instructions how to start

create `.env` file like the example `.env.sample`
start with `npm start`

**http://localhost:3001**

## Description

Chosing the best stroller for your baby shouldn't require a PhD.
Roll Baby Roll is the best Stroller comparator, so you can quickly see and compare what matters for you.

## Motivation

For the Front-End, I want to push my experience in React by using multiple filtering, ranking, global context and other features.

## User Stories

**View All** - As a user I want to land on the page containing the listing of all Strollers existing in the DB

**Filter strollers** - As a regular user, I want to be able to filter using a wide range of criterias

**Rank strollers** - As a regular user, I want to be able to rank a list of stroller using a wide range of criterias

**Add to comparison** - As a regular user, I want to be able to add / remove strollers from the comparator

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

## Backlog

List of other features outside of the MVPs scope

- Signup
- Login
- Logout

## ROUTES Backend:

### Endpoints

| Method | Path      | description                  |
| :----: | --------- | ---------------------------- |
|  GET   | `/`       | homepage with all strollers  |
|  GET   | `/add`    | [ADMIN only] Form to add stroller to DB   |
|  GET   | `/update` | [ADMIN only] Select and Update a stroller |
|  GET   | `/delete` | [ADMIN only] select and delete a stroller |

## Links

### Trello

https://trello.com/b/5TnPaoZI/roll-baby-roll

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/Thibault-d/RollBabyRoll-Front/)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)

# U3T AI

This project provides a user-friendly web platform to play the largely underrated and uncommonly known variation on Tic-Tac-Toe, known as Ultimate Tic-Tac-Toe (U3T). It also provides and employs several artificial intelligence (AI) strategies to allow users to experiment with and test their skills against several semi-sophisticated AI that I've developed. I worked on implementing three different automated approaches to playing the game: Random, Minimax, and the Monte Carlo Tree Search. Each have their advantages and disadvantages, which I'll outline in the following sections.

## Development

### Frontend

To start the frontend, first install dependencies:

```sh
npm install
```

Then, run the following command to start up the server:

```sh
npm run dev
```

### Backend

To start the backend (Django server), first install dependencies:

> Optionally, run `pip install pipenv` to get the package to manage virtual envs if you don't have it yet

```sh
pipenv install
```

Once installed, run the following command to start up the virtual env:

```sh
pipenv shell
```

Now, you're ready to start up the server:

```sh
python3 manage.py runserver
```

To run unit tests, run the following command:

```sh
until ack -f --python | entr -d python3 ./manage.py test; do sleep 1; done
```

## Supplemental Material

- Minimax
  - [Wikipedia, Core Ideas and Pseudocode](https://en.wikipedia.org/wiki/Minimax)
  - [Heuristic Functions](https://boardgames.stackexchange.com/questions/49291/strategy-for-ultimate-tic-tac-toe)

- Monte Carlo Tree Search Algorithm
  - [Wikipedia, Core Ideas](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search)
  - [GeeksforGeeks Summary, Pseudocode](https://www.geeksforgeeks.org/ml-monte-carlo-tree-search-mcts/)
  - [In-depth Algorithm Breakdown](https://int8.io/monte-carlo-tree-search-beginners-guide/)

# Angular - TravisCI - Github Pages [![Build Status](https://travis-ci.org/DDDGamer/angular-travis-ghpages.svg?branch=master)](https://travis-ci.org/DDDGamer/angular-travis-ghpages)

Sample Github Pages Deployment of Angular Apps using TravisCI

This is an example of how a repository with an Angular App can be auto published to Github Pages using Travis CI.

# Motivation
You have an angular project that you want to host. You could find a dedicated host like DigitalOcean, Azure, Heroku, etc... but you would have to pay. Github pages is free and tied to your github account, offering an easy solution.

So essentially you have your angular source code in master branch, and the dist output is hosted in github pages (gh-pages branch). You could of course manually copy the dist folder into the gh-branch or have the dist folder be named doc, but the former is tedious and the latter is not semantically correct. This way automatically builds the dist folder and deploys to gh-pages branmch automatically on successfull builds.

# Steps

## Create new Angular Project
Need something to work with, lets create a new angular project.

* Create a new angular project with [angular cli](https://github.com/angular/angular-cli/wiki/new) (ng) via `ng new [app-name]` with any options listed in the the ng wiki
* Make sure you can build the angular project locally
    * First `npm install` to get all the dependencies
    * Check the [package.json](https://github.com/DDDGamer/angular-travis-ghpages/blob/master/package.json) for existing script commands, and dependencies.
    * I modified my script commands slightly. **Note:** `ng build --base-href ./` I found this is needed otherwise the .css and .js etc. files are not found when opening the index.html.
    * Make sure tests work `npm test` **Note:** Since i have no tests here, i added a simple echo, to have the command work otherwise build bails in TravisCI.
    * Make sure build works `npm run build`.
    * By default ng builds into dist folder. Actually open the dist/index.html and verify page is running fine!!!

## Git Work
We need to push the angular code to github. We also need an empty gh-pages branch to host the angular build.


* NG should initialise a git repo by default, if that didnt happen do `git init`, see [git doc](https://git-scm.com/docs/git-init) for more info
* You can [commit](https://git-scm.com/docs/git-commit) and [push](https://git-scm.com/docs/git-push) your changes with gitbash or any git GUIs like SourceTree, GitCraken etc..
* Now you should have a local master and a master branch in your github repository, now we need a seperate gh-pages branch.
* `git checkout --orphan gh-pages` This will create an empty branch not tied to any other.
* **BE CAREFULL!** `git rm -rf .` This will remove all files in current dir (note the `.` ) *without prompt* to clean the directory.
* `git touch index.html` Create an empty html file so we ahve something to commit.
* Commit and Push the gh-pages branch.
    * `git add index.html`
    * `git commit -a -m "Init gh-pages with empty index.html"`
    * `git push origin gh-pages`

Great, now the repository is all setup! At this stage you could manually push your angular builds to the gh-pages branch. But thats too tedious to do every time, let automate it!

## Travis CI
We can use [TravisCI](https://travis-ci.org/) to do all the builds, and tests if any, and deployments for us. Its free for public repositories.

* Make a Travis account.
* Make sure you are back on the master branch. `git checkout master`
* Make a **.travis.yml** file
* Details here can be adjusted for personal preferences but generally
    * You dont want to build the gh-pages
    * Build only from master
    * Only copy the dist folder to the gh-pages
* See [Travis gh-pages deploy doc](https://docs.travis-ci.com/user/deployment/pages/) and the [.travis.yml](https://github.com/DDDGamer/angular-travis-ghpages/blob/master/.travis.yml) file here for guidence.
* Make sure to set up the tokens, otherwise the deploy will fail.
    * [Token in github](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
    * ![screenshot](https://help.github.com/assets/images/help/settings/personal_access_tokens.png)
    * In travis (in the repo settings, add **GITHUB_TOKEN** env variable)
    * ![Screenshot](https://docs.travis-ci.com/images/settings-env-vars.png)


Side note, here is a more [involved example](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd)

# ANONYMOUS VOTING SYSTEM

Owner: Zahur Meerun

## PROJECT SUMMARY

An anonymous voting system making use of 4 letter code for authentification per voter.

Signed in users can create a survey and specify how many voters they required and add options to the survey.

# PROJECT REQUIREMENTS

- have a login system for admin users to create survey and options.
- have the ability for admin to create survey.
- have the ability to add options to the survey.
- have the ability for admin to specify how many voters are required.
- generate a random 4 letter code to allow users to vote.
- allow users to vote anonymously using a generated code.
- delete code once voted.
- provide feedback to user if code correct/invalid.
- allow admin to have an admin page showing surveys and results links.
- allow admin to view results on a secured page.

## TECHNOLOGY

- Development deployment

  - Docker

- frontend react

  - React 18.3.1
  - React Bootstrap
  - Formik
  - axios

- backend django
  - django rest framework
  - Token authentication

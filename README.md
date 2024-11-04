# ANONYMOUS VOTING SYSTEM

Owner: Zahur Meerun

## PROJECT SUMMARY

An anonymous voting system making use of 4 letter code for authentification per voter.

Signed in users can create a survey and specify how many voters they required and add options to the survey.

# PROJECT REQUIREMENTS

- have a login system for admin users to create poll and options.
- have endpoints for authenticated users to allow polls to be created and add options.
- have an endpoint for authentifcated to specify how many voters are required.
- generate a random 4 letter code to allow users to vote.
- provide and interface for users to vote anonymously using a generated code.
- delete code once voted.
- provide feedback to user if code correct/invalid.
- have an admin page showing polls and results.
- provide authentication and permissions to endpoints depending on the resource.

## TECHNOLOGY

- Development deployment
  - Docker Desktop

- frontend react
  - React 18.3.1
  - React Bootstrap
  - Formik with Yup for validation
  - axios with axios interceptor to cater for token permissions

- backend django
  - django rest framework
  - Token authentication

## AUTHENTICATION AND PERMISSIONS

Token authentication was used to authenticate user and and restrict access to endpoints.

Authentication and permissions were applied globally in ```settings.py``` and modifications were made via class based views.

For example, for survey view, restrictions were removed to allow voting.

Also, certain resources for surveys were limmited to only those authenticated. An example being preventing number of votes per option been shown to unauthenticated users.

Certain restrictions were also applied to React frontend by prohibitng access to certain pages if not authenticated via JavaScript ensuring protected routes.


## ISSUES TO BE ADDRESSED

- Ideally it would have been better to add permissions classes per view, however this did not work and reasons why are documented in django rest framework literaure specifically for generic views. The workaround was to apply restrictions globally and then modifying them in the class based view by modifying the relevant methods. Making use of custom permissions also did not work.

- Testing needs to be done.

- Add relevant forms to allow authenticated users to create poll and options frontend. At present time these details are being created via swagger interface and Postman.

- cleaning up of existing frontend styling.

# face-analysis

This web-app made with React library makes really easy implementing face recognition extending your app functionalities.
It's built up on top of [Kairos API] (https://developer.kairos.com/login).

Setup:
1. Register to Kairos [here](https://developer.kairos.com/login);
2. You will get an `APP_ID` and `APP_KEY`; 
2. Open file `./src/actions/index.js`;
3. Edit lines:
   - 11: ``` const APP_ID = 'APP_ID';  ``` 
   - 12: ``` const API_KEY = 'APP_KEY'; ```
   - 13: ``` const CALLBACK_URL = 'http://192.168.137.3/?Led=1'; ```
   simply replacing strings.

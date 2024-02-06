SpaceX Launchpad Explorer

This application utilizes the SpaceX API to provide information about launchpads and their respective launches. Users can explore launchpads, view launch details, and filter launchpads based on name and region. The application is built using Angular and Angular Material.
---------------------------------------------------------------------------------------------------------------------------------------------------------
Features
-Fetches launchpad data from the SpaceX API.
-Displays launchpad name, region, link to Wikipedia, and a list of launches from each launchpad.
-Implements pagination with configurable records per page (default: 5 launchpads per page).
-Includes a filter feature to search by launchpad name and region.
-Utilizes Angular Material for a clean and modern UI.
---------------------------------------------------------------------------------------------------------------------------------------------------------
To run the application locally, follow these steps:
1. Clone this repository to your local machine:
git clone https://github.com/szszwarcz/Recruitment_Task.git

2. Navigate to the project directory:
cd Recruitment_Task

4. Install dependencies:
npm install

5.Run the application:
ng serve
Open your browser and navigate to http://localhost:4200/ to view the application.

You can also access the application under the link: https://rectask-412807.web.app/home-component
---------------------------------------------------------------------------------------------------------------------------------------------------------
Usage
Upon opening the application, you'll see a list of launchpads with basic information.
Use the pagination controls at the bottom to navigate through pages.
Use the filter input fields to search for launchpads by name or region.
Click on a launchpad's button to view more details, including launches associated with it.
---------------------------------------------------------------------------------------------------------------------------------------------------------
Unit Tests
The application includes unit tests to ensure its functionality remains robust and reliable. To run the tests, use the following command:
ng test
---------------------------------------------------------------------------------------------------------------------------------------------------------
Credits
SpaceX API: https://github.com/r-spacex/SpaceX-API
Angular: https://angular.io/
Angular Material: https://material.angular.io/
---------------------------------------------------------------------------------------------------------------------------------------------------------
License
This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

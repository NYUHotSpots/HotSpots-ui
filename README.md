# HotSpots UI

## Website Information
[https://www.nyuhotspots.tech/](https://www.nyuhotspots.tech/)

- cloud deployment with Github Pages
- displays the same as [http://localhost:3000](http://localhost:3000) after running `npm run start`
- Former link: [https://nyuhotspots.github.io/HotSpots-ui/](https://nyuhotspots.github.io/HotSpots-ui/) (redirects to current link)

## Mockups and Finished Pages
Here is a side-by-side comparison of our original mockup designs with the finished pages.
<br />

### Home (finalized):
<img src="https://user-images.githubusercontent.com/47250793/164798563-6c63659d-1ecb-4cd1-bac6-cd9cd7962d17.png" width=50% height=50%\>
          
### Spot Details:
Mockup          |  Finalized, not logged in/no admin access |  Finalized, logged in with admin access
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/47250793/155821710-74f74f91-c2f0-4762-8922-f0df626a8bb5.png"> | <img src="https://user-images.githubusercontent.com/47250793/164798699-c2342d65-770d-450e-b9f7-ac337a23b370.png"> | <img src="https://user-images.githubusercontent.com/47250793/164795025-7b4de66c-2c85-43c0-9f24-50e20390e932.png">


### Add a New Spot:
Mockup          |  Finalized
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/47250793/155821727-a85d1d44-1c87-431d-8e26-efbfbd6aac2d.JPG"> | <img src="https://user-images.githubusercontent.com/47250793/164793418-261a3984-f7c6-4676-8e57-b352a1f644c1.png">


### Update a Spot:
\* this page was split into 2 pages: Spot Factors and Spot Info <br />
\* Spot Info is only accessible if the user is logged in & has admin access
<br />
Mockup          |  Finalized (Spot Factors)  |  Finalized (Spot Info)
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/47250793/160202384-74089608-507d-4d59-ae29-2dc8b09f8247.JPG"> | <img src="https://user-images.githubusercontent.com/47250793/164799670-f86ff3d3-15be-47f6-ab16-ddbad55870ba.png"> | <img src="https://user-images.githubusercontent.com/47250793/164800271-136c4b35-4cb8-442c-ad0a-9c2ceed7e857.png">


### Add a Review:
Mockup          |  Finalized 
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/47250793/155821718-dc7a21dd-44ca-4c80-8698-e0c2e2e9f73b.JPG"> | <img src="https://user-images.githubusercontent.com/47250793/164798309-a79259ef-8cfc-4897-b897-64975280e1f5.png">


### View all Reviews:
Mockup  |  Finalized (no reviews)  |  Finalized (with reviews)
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/47250793/160202537-23e62c3d-e22a-4e59-b6fb-b4ca5be9096c.JPG"> | <img src="https://user-images.githubusercontent.com/47250793/164798946-6be0feab-9612-4dac-b00f-d7703fb57251.png"> | <img src="https://user-images.githubusercontent.com/47250793/164801606-76363a5d-39cd-4e46-95d4-f6e6725b52c9.png">


### Miscellaneous:
<img src="https://user-images.githubusercontent.com/47250793/164801268-c4dbcc2d-e14e-46a2-b686-6c7b53278172.png" width=50% height=50%\>



## Setup
### Clone the repository
`git clone https://github.com/NYUHotSpots/HotSpots-ui.git`

### CD into the repo
`cd Hotspots-ui`

### Install Dependencies
`npm install` (make sure you have npm & node installed)

### Run the app!
`npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

## Resources Used
- HTML
- CSS
- React
- [material-ui](https://mui.com/getting-started/installation/)
- [Figma](https://www.figma.com/) (for making Mockups)
- [Auth0](https://auth0.com/docs/) (for login/signup system)
- Netlify (for cloud deployment)
- Github Pages (for cloud deployment, **primary**)


## Testing
```
npm run test -- -u
```

- Generate new snapshots

```
npm run test
```

- Regular tests
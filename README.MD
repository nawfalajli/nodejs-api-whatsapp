# node-api-whatsapp
> A simple NodeJS for [whatsapp-web.js](https://github.com/nawfalajli/nodejs-api-whatsapp)

## Technologies

-  [NodeJS](https://nodejs.org/en/)

-  [whatsapp-web.js](https://wwebjs.dev/guide/)

-  [puppeteer](https://pptr.dev/)

## Run

- npm install
- npm start
- Scan your generated qrcode using your whatsapp account
- Enjoy using all the apis

# API Doc
# Auth
**Getting QR Code**
 ``GET : /auth/getqr``
> Used to get a QR Code to Log into Whatsapp Web
	- If not logged in, returns a **QR Code**
	- If logged in, returns a "Authenticated" message.

## Chat
**Sending Messages**
``POST : /chat/sendmessage/<phone_number>``
> Request Body
> - message - contains the message to be sent
<hr>

**Sending Images**
``POST : /chat/sendimage/<phone_number>``
> Request Body
> - image - contains the base64 encoded / URL of image to be sent
> - caption - (optional) - contains caption for the message
<hr>

**Sending PDF**
``POST : /chat/sendpdf/<phone_number>``
> Request Body
> - pdf - contains the base64 encoded / URL of pdf to be sent
<hr>

**Sending Locations**
``POST : /chat/sendlocation/<phone_number>``
> Request Body
> - latitude - contains the string of latitude
> - longitude - contains the string of longitude
> - description - (optional) - contains description for the location
<hr>

**Get Chat By Id**
``GET : /chat/getchatbyid/<phone_number>``
>Returns a Chat

<hr>

**Get Chats**
``GET : /chat/getchats``
>Returns an Array of all Chats


## Group Chat
**Sending Messages to Group**
``POST : /group/sendmessage/<Group_Name>``
> Request Body
> - message - contains the message to be sent
<hr>

**Sending Images**
``POST : /group/sendimage/<Group_Name>``
> Request Body
> - image - contains the base64 encoded / URL of image to be sent
> - caption - (optional) - contains caption for the message
<hr>

**Sending PDF**
``POST : /group/sendpdf/<Group_Name>``
> Request Body
> - pdf - contains the base64 encoded / URL of pdf to be sent
<hr>

**Sending Locations**
``POST : /group/sendlocation/<Group_Name>``
> Request Body
> - latitude - contains the string of latitude
> - longitude - contains the string of longitude
> - description - (optional) - contains description for the location
<hr>


## Contact
**Get Contacts**
``GET : /contact/getcontacts``
>Returns an Array of Contacts of the Current Instance

<hr>

**Get Contact**
``GET : /contact/getcontact/<phone_number>``
>Returns a Contact

</hr>

**Get Profile Pic**
``GET : /contact/getprofilepic/<phone_number>``
>Returns a URL of the User's Profile Picture if Privacy Settings allow it

<hr>

**Is Registered User**
``GET : /contact/isregistereduser/<phone_number>``
>Returns if a given User is registered on Whatsapp

#FIRST OF ALL TELL DOCKER TO IMPORT THE BASE IMAGE
FROM node:16-alpine 
#CREATE A WORKING DIRECTORY. IT SPECIFIES THE PLACE WHERE DOCKER SHOULD RUN COMMANDS OR EXECUTE ACTIONS FROM
WORKDIR /app
#COPY THE PACKAGE.JSON FILE SO THAT NPM INSTALL LAYER CAN BE CACHED
COPY package.json .
#RUN COMMAND UPON MOUNTING. IN THIS CASE NPM INSTALL
RUN npm install
#COPY ALL THE SOURCE FILES IN THE CURRENT DIRECTORY INTO A FOLDER IN THE IMAGE CALLED APP. NORMALLY THE DOT SHOULD INDICATE THAT THE FILE SHOULD BE COPIED INTO THE ROOT OF THE IMAGE BUT BECAUSE WE'VE SPECIFIED THE THE WORKDIR IT THE DOT POINTS AT THE WORKDIR WE SPECIFIED
COPY . .
#EXPOSE A PORT THAT THE PORT THAT THE CONTAINER SHOULD RUN ON
EXPOSE 5000
#RUN A COMMAND WHEN THE CONTAINER IS STARTED. TO DO THAT WE USE THE CMD COMMAND WHICH ACCEPTS THE SPECIFIED COMMAND IN AN ARRAY
CMD ["npm", "start"]

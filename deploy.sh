cd client
npm run build-prod
cd ..
rm -rf server/public
mv client/build server/public
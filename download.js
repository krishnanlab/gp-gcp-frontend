/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
const bucketName = 'mancchri_test_bucket_1';

// The ID of your GCS file
const fileName = 'tmp_gene_list.csv';

// The filename and file path where you want to download the file
const destFileName = '/Users/mancchri/Desktop/gppages.csv';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function streamFileDownload() {
  // The example below demonstrates how we can reference a remote file, then
  // pipe its contents to a local file.
  // Once the stream is created, the data can be piped anywhere (process, sdout, etc)
  await storage
    .bucket(bucketName)
    .file(fileName)
    .createReadStream() //stream is created
    .pipe(fs.createWriteStream(destFileName))
    .on('finish', () => {
      // The file download is complete
    });

  console.log(
    `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
  );
}

streamFileDownload().catch(console.error);
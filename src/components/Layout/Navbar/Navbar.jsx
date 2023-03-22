import { useRef } from 'react';

import icon from '../../../assets/icon.png'
import { sendBase64CodeOfPDF } from '../../../util/api';

export default function Navbar(props) {
  const inputRef = useRef(null);

  const handleClick = () => {
    console.log('here')
    inputRef.current.click();
  }

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleFileChange = async event => {
    // const fileObj = event.target.files && event.target.files[0];
    console.log('here1');

    // const fileObj = event.target.files[0];
    let files = Array.from(event.target.files);
    let fileName = '';
    let filelist = [];

    console.log('files' , files)
    console.log(props)
    await props.uploading.onLoadingTrue();
    files = files.map(async (fileObj) => {
      fileName += fileObj.name;
      
      await getBase64(fileObj, async (result) => {
        console.log('base64 result', result)
        console.log('base64 result', result.substring(28, result.length))
        filelist.push(result.substring(28, result.length))
        return result.substring(26, result.length);
      })
    });

    console.log('files', filelist)
    
    props.uploading.onUploadFile(fileName);
    
    await sendBase64CodeOfPDF(filelist.join(','))
    .then(res => {
      console.log("Success!")
      props.uploading.onLoadingFalse()
    })
    .catch(err => {
      console.log("Error!", err)
      props.uploading.onLoadingFalse()
    });
  };

  return (
    <nav className="flex justify-between w-full p-4">
      <div className='flex'>
      </div>

      <div className='flex text-gray-100'>

        {/* <input
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          multiple={true}
        />
        <button onClick={handleClick}
          className="w-[36px] h-[36px] grid btn-collapse place-content-center"
        >
          +
        </button> */}
      </div>
    </nav>
  );
}
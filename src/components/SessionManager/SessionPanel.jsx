import Move from '../../assets/move.png'
import Figma from '../../assets/figma.png'
import Loading from '../../assets/loading.gif'
import { useRef } from 'react';

import { sendBase64CodeOfPDF } from '../../util/api';



export default function SessionPanel({uploading, asking, response, fileName}) {
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
    console.log(uploading, asking, response);

    // const fileObj = event.target.files[0];
    let files = Array.from(event.target.files);
    let fileNames = '';
    let filelist = [];

    console.log('files' , files)
    await uploading.onLoadingTrue();
    files = files.map(async (fileObj) => {
      fileNames += fileObj.name;
      
      await getBase64(fileObj, async (result) => {
        console.log('base64 result', result)
        console.log('base64 result', result.substring(28, result.length))
        filelist.push(result.substring(28, result.length))
        return result.substring(26, result.length);
      })
    });

    console.log('files', filelist)
    
    uploading.onUploadFile(fileNames);
    
    await sendBase64CodeOfPDF(filelist.join(','))
    .then(res => {
      console.log("Success!")
      uploading.onLoadingFalse()
    })
    .catch(err => {
      console.log("Error!", err)
      uploading.onLoadingFalse()
    });
  };

  return (
    <div className='w-full py-4'>

      <div className='relative w-full grid justify-center'>

        {/* Sidebar */}
        <div className='absolute flex flex-col'>

        </div>

        {/* Demo */}

        { fileName ? 
          <div className='w-full text-base file-name text-gray-100'>
            <div>{fileName}</div>
          </div>
          : ""
        }

        <div className="relative w-[834px] session-panel text-gray-100 text-base my-4">
          
          <div className="grid w-full text-base gap-y-6 p-4 ">

            <div className="flex gap-[28px]">
              {/* <div className='w-[64px] h-[64px] grid place-content-center text-[18px] bg-gray-100 text-gray-900 session-con-img '>
                AM
              </div> */}
              <input
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
              </button>
              {(<div className="flex-1 text-base align-middle inline-block" style={{ color: "#F3F3F3" }}>
                { !asking ?
                  response
                  :
                  <div className="grid justify-items-center items-center w-full h-full z-50 top-0">
                    {/* <div className="justify-self-center spinner w-[50px] h-[50px]" /> */}
                    <img className='justify-self-center w-[25px] ' src={Loading} alt="Loading" />
                  </div>
                }
              </div>
              )}
            </div>

            <hr className='hr-bg' />

          </div>
        </div>
        
        {/* Main Section */}
        {/* <div className="relative w-[834px] session-panel text-gray-100 text-base">
          <div className="grid w-full text-base gap-y-6 p-4 ">

            <div className="flex gap-[28px]">
              <div className='w-[64px] h-[64px] grid place-content-center text-[18px] bg-gray-100 text-gray-900 session-con-img '>
                AM
              </div>

              <div className="flex-1 text-base align-middle inline-block" style={{color: "#F3F3F3"}}>
                  Please forward me to the c1 cockpit prototype explorations that were made between 6th january to 25th february
              </div>
            </div>

            <hr className='hr-bg' />

            <div className="flex flex-row gap-[28px]">
              <div className='w-[64px] h-[64px] session-btn-move grid place-content-center'>
                <img className='' src={Move} alt="Move" />
              </div>

              <div className="flex-1 text-base align-middle inline-block" style={{color: "#F3F3F3"}}>
                Sure, here are all the C1 Cockpit Prototype explorations that were made between the 6th January to 25th February in 2023.
                <div className='bt-6'></div>
              </div>
            </div>

            <div className='px-4 py-6 figma-bg max-h-[445px] overflow-auto'>
              <div className='grid gap-y-[18px]'>
                <Figmas />
                <Figmas />
                <Figmas />
                <Figmas />
                <Figmas />
                <Figmas />
                <Figmas />
                <Figmas />
              </div>
            </div>

          </div>
        </div> */}
      </div>
    </div>
  );
}
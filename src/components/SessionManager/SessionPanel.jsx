import Move from '../../assets/move.png'
import Figma from '../../assets/figma.png'
import Loading from '../../assets/loading.gif'
import { useRef } from 'react'

import { sendBase64CodeOfPDF } from '../../util/api'
import { OutTable, ExcelRenderer } from 'react-excel-renderer'
import axios from 'axios'

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

    const formData = new FormData();
    for(const fileObj of event.target.files){
      formData.append('files', fileObj, fileObj.name)
    }

    axios
      .post("/initialize", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // let fileObj = event.target.files[0];
    // uploading.onUploadFile(fileObj.name)
    // await uploading.onLoadingTrue();

    // await getBase64(fileObj, async (result) => {
    //   await sendBase64CodeOfPDF(result.substring(28, result.length))
    //   .then(res => {
    //     console.log("Success!")
    //     uploading.onLoadingFalse()
    //   })
    //   .catch(err => {
    //     console.log("Error!", err)
    //     uploading.onLoadingFalse()
    //   });
    // })

    // let files = Array.from(event.target.files);
    // let fileNames = '';
    // let filelist = [];

    // console.log('files' , files)
    // await uploading.onLoadingTrue();
    // files = files.map(async (fileObj) => {
      
    //   fileNames += fileObj.name;

    //   await getBase64(fileObj, async (result) => {
    //     await sendBase64CodeOfPDF(result.substring(28, result.length))
    //       .then(res => {
    //         console.log('Success!')
    //         uploading.onLoadingFalse()
    //       })
    //       .catch(err => {
    //         console.log("Error!", err)
    //         uploading.onLoadingFalse()
    //       })
    //   })
    // });
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
      </div>
    </div>
  );
}
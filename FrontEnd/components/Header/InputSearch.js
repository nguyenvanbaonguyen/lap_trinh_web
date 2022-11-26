import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState, memo } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { Popover } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const InputSearch = ({ className = '' }) => {
  const [nameDog, setNameDog] = useState('');
  const [listDogs, setListDogs] = useState([]);
  const [hideSearch, setHideSearch] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (nameDog === '') {
      setListDogs([]);
      return;
    }
    const getDogs = async () => {
      const res = await axios.get('https://635a58ac6f97ae73a62a1943.mockapi.io/api/v1/dogs', {
        params: {
          name: nameDog,
          page: 1,
          limit: 8,
        },
      });
      setListDogs(res.data.dogs);
    };
    getDogs();
  }, [nameDog]);

  return (
    <div
      className={`flex items-center h-[44px] laptop:bg-[#FDFDFD] rounded-full relative  min-[1350px]:rounded-[46px] ${className}`}
    >
      <label className="min-[1350px]:ml-1 min-w-[44px] h-full centreFlex">
        <RiSearchLine className="h-[23px] w-[23px] text-[#00171F] laptop:w-4 laptop:h-4 laptop:text-[#667479]" />
      </label>
      <input
        placeholder="Search something here!"
        className="text-14-20-500 w-0 min-[1350px]:w-[217px] transition-all duration-500"
        onChange={(e) => setNameDog(e.target.value)}
        value={nameDog}
        onFocus={() => setHideSearch(false)}
        onBlur={(e) => setHideSearch(true)}
      ></input>
      <div
        className={`absolute w-full bg-white  top-0 translate-y-[50px] z-50 rounded-xl px-2  ${
          (hideSearch || listDogs === []) && 'hidden'
        }`}
        onClick={() => console.log(1)}
      >
        {listDogs.map((dog) => (
          <div
            className="flex h-[50px] py-1 items-center border-b-2"
            onMouseDown={() => {
              router.push({
                pathname: '/pet/[id]',
                query: { id: dog?.id },
              });
            }}
          >
            <img src={dog.avatar} alt="" className="h-[80%] rounded-md" />
            <p className="text-16-24-500 ml-2">{dog.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(InputSearch);
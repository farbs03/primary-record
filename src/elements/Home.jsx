import {useState} from "react"
import {fakeUser} from "../fakeUser"

function Home() {

  return (
      <div className='py-4'>
          <p className="text-2xl font-semibold">Welcome, {fakeUser.fName}</p>
      </div>
  );
}

export default Home;

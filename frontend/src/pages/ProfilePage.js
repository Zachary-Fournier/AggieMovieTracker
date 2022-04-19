import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../Utilities';

export default function ProfilePage() {

  return (
    <div>
      <p>Name</p>
      <p>Age</p>
      <p>Favorite Movie</p>
      <p>Number of movies watched</p>
    </div>
  )
}

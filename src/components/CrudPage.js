import React, { useCallback, useEffect, useState } from 'react'
import Adminpanel from './adminpanel'

export default function CrudPage() {
    

  return (
    <div>
        <div>
            <Adminpanel name="books" baseURL="http://localhost:3001/books"></Adminpanel>
        </div>
        
    </div>
  )
}

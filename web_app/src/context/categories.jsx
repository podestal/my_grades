import { createContext, useState } from "react";

export const CategoriesContext = createContext()

const CategoriesContextProvider = ({ children }) => {

    const [categories, setCategories] = useState([])

    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesContextProvider
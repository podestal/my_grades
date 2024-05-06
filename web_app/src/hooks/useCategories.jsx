import { useContext } from "react";
import { CategoriesContext } from "../context/categories";

const useCategories = () => {
    return useContext(CategoriesContext)
}

export default useCategories
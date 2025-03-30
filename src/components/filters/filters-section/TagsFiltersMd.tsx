import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { filterChangeTypeAction } from "../../../store/reducers/filter-reducer";
import { addTag, GuideTagInterface, removeTag, TagsState } from "../../../store/reducers/guides-tags-reducer";
import "./SearchAndFilter.css"
import { useQueryClient } from 'react-query';


export const TagsFiltersMd:React.FC = () => {
    const dispatch = useDispatch();

    function handleFilterChange(key: string){
        filterChangeTypeAction(dispatch,key);
       
        if (tagsReducer.selectedTags.includes(key)){
            dispatch(removeTag(key))
        }
        else{
            dispatch(addTag(key));
        }
    }

    const { i18n } = useTranslation();

    const tagsReducer = useTypedSelector(state => state.tagsReducer) as TagsState;
    const tags = useQueryClient().getQueryData('tags') as GuideTagInterface[];

    return (
        <div className="filters-modal-wrapper">
            <div className="dropdown-tags" style={{position: "relative", marginTop: "0", boxShadow: "none", backgroundColor: "transparent"}}>
                <div className="selected-tags-count">
                    {(i18n.language == 'ru') ? 'Выбрать теги' : 'Tags'}
                </div>
                <div className="tags-container">
                    {tags.map((tag: GuideTagInterface) => (
                    <button
                        key={tag.Id}
                        style={tagsReducer.selectedTags.includes(tag.Id) ? {borderColor: "#007bff", backgroundColor: "#007bff"} : {borderColor: "#101113", backgroundColor: "#101113"}}
                        className={`dropdown-tag-item ${tagsReducer.selectedTags.includes(tag.Id) ? 'active' : ''}`} // Добавлено условие для активного тега
                        onClick={() => handleFilterChange(tag.Id)}
                    >
                        {(i18n.language == 'ru') ? tag.nameRu : tag.nameEn}
                    </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
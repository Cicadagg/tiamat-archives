import React, {useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { StatusesInterface} from "../../store/reducers/statuses-reducer";
import { ownerType } from "../../constants/types";
import { Search } from "../search/Search";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { isStatusFilterMatching } from "../../tools/isStatusFilterMatching";
import "./StatusesTable.css";

interface TableRowProps extends StatusesInterface{
    reference?: HTMLElement | null;
    id:string;
    nameEN:string;
    nameRU:string;
    descriptionEN:string;
    descriptionRU:string;
}

export const StatusesTable:React.FC = () => {
    const statuses = useQueryClient().getQueryData("statuses") as StatusesInterface[]|null;
    const {value} = useTypedSelector(store => store.searchReducer);
    const {t,i18n} = useTranslation();
    const statusesExtended:TableRowProps[] = statuses || [];
    const [animatedClass , setAnimatedClass ] = useState("");
    const [timeoutId, setTimeoutId] = useState<null|NodeJS.Timeout>(null);

    const filteredData = (statusesExtended) 
    ? statusesExtended.reduce((acc:TableRowProps[],curr)=>{
        if(isStatusFilterMatching(value,curr,i18n.language))
            acc.push(curr);
        return acc;
    },[])
    : [];

    const buttonsSections = [
        {owners:"sinner",header:t("StatusesTable.header.sinner")},
        {owners:"ego",header:t("StatusesTable.header.ego")},
        {owners:"sinner_story",header:t("StatusesTable.header.sinner_story")},
        {owners:"anomaly",header:t("StatusesTable.header.anomaly")},
        {owners:"md_gift",header:t("StatusesTable.header.md_gift")},
        {owners:"none",header:t("StatusesTable.header.none")},
    ];
    const handleScrollHighlight = (id:string,index:number) => {
        if (timeoutId) clearTimeout(timeoutId);

        setAnimatedClass(id);

        const newTimeoutId = setTimeout(() => {
            setAnimatedClass("");
        }, 1000 + index*5);

        setTimeoutId(newTimeoutId);
    } 
    const handleScroll = (statusId:string,index:number) => {
        if (statuses && statusId) {
          const status = statusesExtended.find((status) => status.id === statusId);
          if (status && status.reference) {
            status.reference.scrollIntoView({ behavior: 'smooth', block: 'center' });
            handleScrollHighlight(statusId,index);
          }
        }
      };
    return <>

        {buttonsSections.map((section, index) => {
            return <section key={index} className="statuses-section">
                <h2>{section.header}</h2>
                <article className="statuses-buttons">
                    {statuses?.map((status, index) => {
                        const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
                        const name = status[nameKey] as string;

                        if (status.owners?.includes(section.owners as ownerType)) {
                            return <button
                                key={status.id}
                                onClick={() => { handleScroll(status.id, index); }}>
                                <div className="status-tooltip">{name}</div>
                                <img src={`${process.env.PUBLIC_URL}/images/tags/${status.id}.webp`} alt={status.id} />
                            </button>
                        }
                    })}
                </article>
            </section>
        })}

        <section className="statuses-section">
            <Search/>
            </section>
            <table className="statuses-table">
                <thead>
                    <tr>
                        <th className="statuses-table-th-image">
                            {t("StatusesTable.status")}
                        </th>
                        <th className="statuses-table-th-name">
                            {t("StatusesTable.name")}
                        </th>
                        <th className="statuses-table-th-description">
                            {t("StatusesTable.description")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                {filteredData.map((status) => {
                    const {id} = status;

                    const descriptionKey = `description${i18n.language.toUpperCase()}` as keyof typeof status;
                    const description = status[descriptionKey] as string;

                    const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
                    const name = status[nameKey] as string;

                    const descriptionFormatedToHTML = `${description.replaceAll("%",'<span class="perCent-special-font">%</span>')}`
                    return <tr key={id} className={`${id === animatedClass && "statuses-table-tr--active"} ${id === animatedClass && "statuses-table-tr--active"}`} ref={(rowReference) => (status.reference = rowReference as HTMLTableRowElement | null)}>
                    <td className={`statuses-table-th-image`}>
                        <img src={`${process.env.PUBLIC_URL}/images/tags/${id}.webp`} alt={id} />
                    </td>
                    <td className="statuses-table-th-name">{name}</td>
                    <td className="statuses-table-th-description" dangerouslySetInnerHTML={{__html:descriptionFormatedToHTML}}/>
                </tr>
                })}
            </tbody>
            </table>
        </>
}
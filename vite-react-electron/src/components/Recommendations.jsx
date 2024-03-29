import { useCallback } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { AccordionRecommendation } from "../components/Accordion";
import "../assets/css/Recommendations.css";

export default function Recommendations({ recommendations, onRecommendationsChange }) {
    
    const handleAddRec = useCallback((technology) => {
        // add to acceptedRecs
        onRecommendationsChange((prevRecommendations) => ({
            ...prevRecommendations, 
            acceptedRecs: [...prevRecommendations.acceptedRecs, technology]
        }));

        // remove from recommendations
        onRecommendationsChange((prevRecommendations) => ({
            ...prevRecommendations, 
            recs: prevRecommendations.recs.filter((tech) => tech !== technology)
        }));

    }, [recommendations, onRecommendationsChange]);

    const handleRejectRec = (technology) => {
        onRecommendationsChange((prevRecommendations) => ({
            ...prevRecommendations, 
            recs: prevRecommendations.recs.filter((tech) => tech !== technology)
        }));
    }

    const handleRemoveRec = useCallback((technology) => {
        // remove from acceptedRecs
        onRecommendationsChange((prevRecommendations) => ({
            ...prevRecommendations, 
            acceptedRecs: prevRecommendations.acceptedRecs.filter((tech) => tech !== technology)
        }));

        // add back to recommendations
        onRecommendationsChange((prevRecommendations) => ({
            ...prevRecommendations, 
            recs: [...prevRecommendations.recs, technology]
        }));

    }, [recommendations, onRecommendationsChange]);

    console.log(recommendations);

    return (
        <>
            <div className="recs-inner">
                <table className="recs-table">
                    <tr className="recs-row-header">
                        <th className="recs-tech">Recommendation</th>
                        <th className="recs-action">Actions</th>
                    </tr>
                    <tr className="pending-approval">
                        <td className="pending-approval-accordion" colSpan={2}>
                            <AccordionRecommendation title={"Pending Approval ("+recommendations.recs.length+")"} children={
                                <table className="pending-table">
                                    {recommendations.recs && recommendations.recs.map((rec, index) => {
                                        return (
                                            <tr className="pending-recs" key={index}>
                                                <td className="pending-recs-tech">{rec}</td>
                                                <td className="pending-recs-actions">
                                                    <span className="action-item green" onClick={() => handleAddRec(rec)}>Approve</span>
                                                    <span className="action-item red" onClick={() => handleRejectRec(rec)}>Reject</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            }/>
                        </td>
                    </tr>
                    <tr>
                        <td className="accepted-table-container" colSpan={2}>
                            <table className="accepted-table">
                                {recommendations.acceptedRecs && recommendations.acceptedRecs.map((acceptedRec, index) => {
                                    return (
                                        <tr className="accepted-recs" key={index}>
                                            <td className="accepted-recs-tech">{acceptedRec}</td>
                                            <td className="accepted-recs-actions">
                                                <span className="accepted-recs-trash" onClick={() => handleRemoveRec(acceptedRec)}><FaTrash /></span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
}


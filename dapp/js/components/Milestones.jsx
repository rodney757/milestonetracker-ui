/**
 * Component for a campaign to be shown in a list of campaigns
 *
 * Expects following properties:
 */

import React from "react";

import { Accordion, Panel } from "react-bootstrap";
import Milestone from "./Milestone";

export default function Milestones(props) {
    let content = "There are no milestones";

    if (props.milestones) {
        let milestones = [];
        for (let i = 0; i < props.milestones.length; ++ i) {
            milestones.push(
                <Panel
                  collapsible
                  defaultExpanded
                  key={ i }
                  header={ `Milestone #${ i + 1 }` }
                  eventKey={ i }
                >
                    <Milestone
                      description={ props.milestones[ i ].description }
                      url={ props.milestones[ i ].url }
                      maxCompletionDate={ props.milestones[ i ].maxCompletionDate }
                      minCompletionDate={ props.milestones[ i ].minCompletionDate }
                      milestoneLeadLink={ props.milestones[ i ].milestoneLeadLink }
                      reviewer={ props.milestones[ i ].reviewer }
                      reviewTime={ props.milestones[ i ].reviewTime }
                      paymentSource={ props.milestones[ i ].paymentSource }
                      status={ props.milestones[ i ].status }
                      doneTime={ props.milestones[ i ].doneTime }
                    />
                </Panel>);
        }
        content = (
            <Accordion>
                { milestones }
            </Accordion>);
    }

    return (
        <div>
            <h2>{ props.header }</h2>
            {content}
        </div>
    );
}

Milestones.propTypes = {
    approved: React.PropTypes.bool,
    milestones: React.PropTypes.array,
    header: React.PropTypes.string.isRequired,
};
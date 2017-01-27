/**
 *
 *
 */
import React from "react";

import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { MilestoneEdit } from "../components";

export default class SingleCampaignPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            milestoneModalShow: false,
        };
    }
    getInitialState() {
        return { milestoneModalShow: false };
    }

    handleProposeMilestones() {
        this.props.onProposeMilestones(
            this.props.givethDirectoryState.campaigns[ 0 ]
            .milestoneTrackerAddress, [
                {
                    description: "Proposal 0",
                    url: "http://url_0",
                    minCompletionDate: 1485536465,
                    maxCompletionDate: 1485709265,
                    reviewer: "0xac622a6d87fcf9a1922ae01919b17f33d2ccf456",
                    milestoneLeadLink: "0xb742329ced9d9a5a140f12cf0c153b4a10370d0b",
                    reviewTime: 172800,
                    paymentSource: "0x090bd3a4cf3ff8ebf41c874d44036fa2a075065c",
                    payDescription: "Proposal 0",
                    payRecipient: "0xaa275222bce2d5a60cd47f709ec7dbba0d8d2f39",
                    payValue: 10,
                    payDelay: 0,
                },
            ]
        );
    }

    render() {
        let campaign = "Loading....";
        let campaignInfo = "";
        let jsonobj = "";
        let milestoneModalClose = () => this.setState({ milestoneModalShow: false });

        if (this.props.givethDirectoryState.campaigns &&
            this.props.givethDirectoryState.campaigns.length >= this.props.params.campaignId - 1) {
            const currentCampaign = this.props.givethDirectoryState.campaigns[ 0 ];
            campaign = (<div>
                <h2>
                    <a
                      href={ currentCampaign.url }
                      target="_blank"
                    >
                      { currentCampaign.name }
                    </a>
                </h2>
                <p>{ currentCampaign.description }</p>
            </div>);

            campaignInfo = (
                <Table striped bordered condensed hover>
                    <tbody>
                        <tr>
                            <td>Website</td>
                            <td>
                                <a
                                  href={ currentCampaign.url }
                                  target="_blank"
                                >
                                { currentCampaign.url }
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>MiniMe Token Address</td>
                            <td>{ currentCampaign.tokenAddress }</td>
                        </tr>
                        <tr>
                            <td>Vault Address</td>
                            <td>{ currentCampaign.vaultAddress }</td>
                        </tr>
                        <tr>
                            <td>Milestone Tracker Address</td>
                            <td>{ currentCampaign.milestoneTrackerAddress }</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{ currentCampaign.status }</td>
                        </tr>
                    </tbody>
                </Table>
            );

            jsonobj = <pre> {JSON.stringify(currentCampaign, null, 2)}</pre>;
        }

        return (
            <div>
                <Grid>
                    <Row>
                        <Col>{ campaign }</Col>
                    </Row>
                    <Row>
                        <Col>{ campaignInfo }</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                              bsStyle="primary"
                              onClick={ () => this.setState({ milestoneModalShow: true })}
                            >
                                Add Milestone
                            </Button>
                            <Button onClick={ this.handleProposeMilestones } />
                            <MilestoneEdit
                              show={this.state.milestoneModalShow}
                              onHide={milestoneModalClose}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>{ jsonobj }</Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

SingleCampaignPage.propTypes = {
    givethDirectoryState: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    onProposeMilestones: React.PropTypes.func.isRequired,
};
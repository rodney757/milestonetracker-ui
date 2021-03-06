/**
 * Component for
 *
 * Expects following properties:
 */

import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

import { TableDetails, MilestoneButtons } from "./";
import { web3, network } from "../blockchain";

class MilestoneDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
        };
    }

    render() {
        const minDate = moment.unix(this.props.milestone.minCompletionDate);
        const maxDate = moment.unix(this.props.milestone.maxCompletionDate);
        const doneTime = this.props.milestone.doneTime ?
          moment.unix(this.props.milestone.doneTime).format("YYYY-MM-DD, h:mm:ss") : "-";
        const reviewTime = moment.duration(this.props.milestone.reviewTime, "s");
        const payDelay = moment.duration(this.props.milestone.payDelay, "s");
        const earliestPayTime = this.props.milestone.paymentInfo ?
            moment.unix(this.props.milestone.paymentInfo.earliestPayTime) : null;
        const wordBreak = "break-all";

        const data = [
            {
                label: "Min Completion Date",
                content: minDate.format("YYYY-MM-DD, h:mm:ss"),
            },
            {
                label: "Max Completion Date",
                content: maxDate.format("YYYY-MM-DD, h:mm:ss"),
            },
            {
                label: "Payment Delay",
                content: payDelay.humanize(),
            },
            {
                label: "Payment Amount",
                content: `${ web3.fromWei(this.props.milestone.payValue) } Ether`,
            },
            {
                label: "Payment Source",
                content: (
                    <a
                      href={`${ network.etherscan }address/${ this.props.milestone.paymentSource }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ wordBreak }}
                    >
                        {this.props.milestone.paymentSource}
                    </a>),
            },
            {
                label: "Payment Recipient",
                content: (
                    <a
                      href={`${ network.etherscan }address/${ this.props.milestone.payRecipient }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ wordBreak }}
                    >
                        {this.props.milestone.payRecipient}
                    </a>),
            },
            {
                label: "Earliest Payment Time",
                content: earliestPayTime ? earliestPayTime.format("YYYY-MM-DD, h:mm:ss") : "",
            },
            {
                label: "Time to Review",
                content: reviewTime.humanize(),
            },
            {
                label: "Done Time",
                content: doneTime,
            },
            {
                label: "Reviewer",
                content: (
                    <a
                      href={`${ network.etherscan }address/${ this.props.milestone.reviewer }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ wordBreak }}
                    >
                        {this.props.milestone.reviewer}
                    </a>),
            },
            {
                label: "URL",
                content: (
                    <a
                      href={this.props.milestone.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ wordBreak }}
                    >
                        {this.props.milestone.url}
                    </a>),
            },
            {
                label: "Paid",
                content: this.props.milestone.paymentInfo && this.props.milestone.paymentInfo.paid ? "yes" : "no",
            },
        ];

        return (
            <Modal
              show={this.props.show}
              onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.milestone.payDescription !== undefined ?
                          this.props.milestone.payDescription : "The title could not be read"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.milestone.description}</p>
                    <TableDetails data={data} />
                </Modal.Body>
                <Modal.Footer>
                    <MilestoneButtons
                      actions={this.props.milestone.actions}
                      milestoneID={this.props.milestone.id}
                      milestoneTrackerAddress={this.props.milestoneTrackerAddress}
                    />
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

MilestoneDetail.propTypes = {
    milestone: PropTypes.shape({
        payDescription: PropTypes.string,
        description: PropTypes.string.isRequired,
        minCompletionDate: PropTypes.number.isRequired,
        maxCompletionDate: PropTypes.number.isRequired,
        payDelay: PropTypes.number,
        payValue: PropTypes.oneOfType([ PropTypes.shape({
            c: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
            e: PropTypes.number.isRequired,
            s: PropTypes.number.isRequired,
        }), PropTypes.string ]),
        paymentSource: PropTypes.string.isRequired,
        reviewTime: PropTypes.number.isRequired,
        doneTime: PropTypes.number,
        reviewer: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        paymentInfo: PropTypes.shape({
            paid: PropTypes.bool,
            earliestPayTime: PropTypes.number,
        }),
        payRecipient: PropTypes.string,
        actions: PropTypes.shape(),
        id: PropTypes.number.isRequired,
    }).isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    milestoneTrackerAddress: PropTypes.string.isRequired,
};

export default MilestoneDetail;

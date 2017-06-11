import React from "react";
import { HashRouter, Route, /* IndexRoute */ Switch } from "react-router-dom";
import { App } from "./components";
import {
    PageCampaigns, PageAbout, PageCampaign, PageCampaignDetails, PageCampaignMilestones,
    PageCampaignVault, PageMyAccount, CampaignDeployer,
} from "./containers/Pages";
// import Web3Info from "./containers/Web3Info";

const Routes = () => (
    <HashRouter>
        <App>
            <Switch>
                <Route exact path="/" component={PageCampaigns} />

                <Route path="/myaccount" component={PageMyAccount} />
                <Route path="/campaigndeployer" component={CampaignDeployer} />
                <Route path="/about" component={PageAbout} />
                <Route exact path="/campaigns" component={PageCampaigns} />
                <Route exact path="/campaigns/:campaignId" component={PageCampaign} />
                <Route
                  path="/campaigns/:campaignId/details"
                  component={PageCampaignDetails}
                />
                <Route
                  path="/campaigns/:campaignId/milestones"
                  component={PageCampaignMilestones}
                />
                <Route
                  path="/campaigns/:campaignId/vault"
                  component={PageCampaignVault}
                />
            </Switch>
        </App>
    </HashRouter>);

export default Routes;

/** Middleware: Check User Permission vs. User ID 
 * 
 * User Types
 *  ---- Basic Users -----
 *  - Tier 0.0 - Verified/Authenticated
 *  - Tier 0.1 - Identified/Validated
 *  ---- Paid Users -----
 *  - Tier1 (Paid Tier)
 *  - Tier2 (Paid Tier)
 *  ---- Site Management ----
 *  - SiteModerator
 *  - SiteAdmin
 *  ---- Independent Contributors ----
 *  - IndependentAuthor
 *  - IndependentPublisher
 *  - IndependentAdmin
 *  ---- Corporate Contributors ----
 *  - CorporateAuthor
 *  - CorporatePublisher
 *  - CorporateAdmin
*/

class AuthorizationHandling {
    static validatePermitted(tokenClientGroups, endpointPermissions) {

        return true;
    }
}

module.exports = AuthorizationHandling;
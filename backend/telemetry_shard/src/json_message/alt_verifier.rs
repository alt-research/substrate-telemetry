use super::hash::Hash;
use common::node_message as internal;
use serde::Deserialize;

pub use internal::ChainType;

/// The Details info for a alt-verifier node.
#[derive(Deserialize, Debug, Clone)]
pub struct VerifierNodeDetails {
    /// The beacon chain 's genesis.
    pub beacon_genesis_hash: Hash,
    /// The layer2(producer) chain 's genesis.
    pub layer2_genesis_hash: Hash,
    /// The app id of the layer2 in layer1.
    pub layer2_rollup_id: u32,
    /// The verifier public key.
    pub verifier: Box<str>,
    /// The name of the verifier node.
    pub name: Box<str>,
}

impl From<VerifierNodeDetails> for internal::VerifierNodeDetails {
    fn from(msg: VerifierNodeDetails) -> Self {
        internal::VerifierNodeDetails {
            beacon_genesis_hash: msg.beacon_genesis_hash.into(),
            layer2_genesis_hash: msg.layer2_genesis_hash.into(),
            layer2_rollup_id: msg.layer2_rollup_id,
            verifier: msg.verifier,
            name: msg.name,
        }
    }
}

/// The Details info for a alt-verifier node.
#[derive(Deserialize, Debug, Clone)]
pub struct VerifierProcessFinalityBlock {
    pub number: u64,
    pub hash: Hash,
    pub expect_number: u64,
}

impl From<VerifierProcessFinalityBlock> for internal::VerifierProcessFinalityBlock {
    fn from(msg: VerifierProcessFinalityBlock) -> Self {
        internal::VerifierProcessFinalityBlock {
            number: msg.number,
            hash: msg.hash.into(),
            expect_number: msg.expect_number,
        }
    }
}

/// The Details commit info for a alt-verifier node.
#[derive(Deserialize, Debug, Clone)]
pub struct VerifierDetailsStats {
    pub submitted_commit: Option<Hash>,
    pub submitted_block_number: Option<u64>,
    pub submitted_block_hash: Option<Hash>,
    pub challenged_commit: Option<Hash>,
    pub challenged_block_number: Option<u64>,
    pub challenged_block_hash: Option<Hash>,
}

impl From<VerifierDetailsStats> for internal::VerifierDetailsStats {
    fn from(msg: VerifierDetailsStats) -> Self {
        internal::VerifierDetailsStats {
            submitted_commit: msg.submitted_commit.map(|d| d.into()),
            submitted_block_number: msg.submitted_block_number,
            submitted_block_hash: msg.submitted_block_hash.map(|d| d.into()),
            challenged_commit: msg.challenged_commit.map(|d| d.into()),
            challenged_block_number: msg.challenged_block_number,
            challenged_block_hash: msg.challenged_block_hash.map(|d| d.into()),
        }
    }
}

/// The Details info for a alt-verifier node.
#[derive(Deserialize, Debug, Clone)]
pub struct VerifierPeriodStats {
    pub submission: Option<u32>,
    pub challenge: Option<u32>,
}

impl From<VerifierPeriodStats> for internal::VerifierPeriodStats {
    fn from(msg: VerifierPeriodStats) -> Self {
        internal::VerifierPeriodStats {
            submission: msg.submission.map(|d| d.into()),
            challenge: msg.challenge.map(|d| d.into()),
        }
    }
}

/// The Details info for a alt-verifier node.
#[derive(Deserialize, Debug, Clone)]
pub struct RollupNodeDetails {
    /// The layer1 chain 's chain id.
    pub layer1_chain_id: u64,
    /// The layer2(producer) chain 's genesis.
    pub layer2_genesis_hash: Hash,
    /// The committer public key.
    pub committer: Box<str>,
    /// The name of the verifier node.
    pub name: Box<str>,
}

impl From<RollupNodeDetails> for internal::RollupNodeDetails {
    fn from(msg: RollupNodeDetails) -> Self {
        internal::RollupNodeDetails {
            layer1_chain_id: msg.layer1_chain_id,
            layer2_genesis_hash: msg.layer2_genesis_hash.into(),
            committer: msg.committer,
            name: msg.name,
        }
    }
}

/// The Details commit info for a alt-verifier node.
#[derive(Deserialize, Debug, Clone)]
pub struct RollupChallengeStats {
    /// Challenge id
    pub id: Option<u64>,
    /// Left bound of the binary search: challenger & defender agree on all steps <= L.
    pub l: Option<u64>,
    /// Right bound of the binary search: challenger & defender disagree on all steps >= R.
    pub r: Option<u64>,
    /// Block number preceding the challenged block.
    pub block_number: Option<u64>,
    /// the challenger address.
    pub challenger: Option<Box<str>>,
    /// the defender address.
    pub defender: Option<Box<str>>,
    pub status: Option<Box<str>>,
    pub is_defender_turn: Option<bool>,
}

impl From<RollupChallengeStats> for internal::RollupChallengeStats {
    fn from(msg: RollupChallengeStats) -> Self {
        internal::RollupChallengeStats {
            id: msg.id,
            l: msg.l,
            r: msg.r,
            block_number: msg.block_number,
            challenger: msg.challenger,
            defender: msg.defender,
            status: msg.status,
            is_defender_turn: msg.is_defender_turn,
        }
    }
}

/// The Details info for a alt-verifier node.
#[derive(Deserialize, Debug, Clone)]
pub struct RollupDetailsStats {
    pub submitter: Box<str>,
    pub checkpoint: u64,
    pub commit_hash: Hash,
    pub l1_block_number: u64,
}

impl From<RollupDetailsStats> for internal::RollupDetailsStats {
    fn from(msg: RollupDetailsStats) -> Self {
        internal::RollupDetailsStats {
            submitter: msg.submitter,
            checkpoint: msg.checkpoint.into(),
            commit_hash: msg.commit_hash.into(),
            l1_block_number: msg.l1_block_number.into(),
        }
    }
}

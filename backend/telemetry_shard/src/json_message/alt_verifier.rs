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

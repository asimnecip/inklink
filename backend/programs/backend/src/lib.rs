use anchor_lang::prelude::*;

declare_id!("H2QcxTVK9sWKBTVE6sg8uJ7KxfDcB5zwDQ92E7ED1gzW");

#[program]
pub mod backend {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

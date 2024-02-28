use anchor_lang::prelude::*;

declare_id!("AwCDoyQvn8H9oszX7EkzVhM1L6DFu6QCE1vqPM34gbtG");

#[program]
pub mod rust_backend {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

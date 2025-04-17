const args = process.argv.slice(2);

export const getUserName = () => {
    const userName = args.find((arg) => arg.startsWith('--username'));
    return userName ? userName.split('=')[1] : 'User';
}
